import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertTeamMemberSchema, insertBlogPostSchema, insertProgramSchema,
  insertEventSchema, insertDonationSchema, insertMerchandiseSchema,
  insertContactMessageSchema, insertGalleryImageSchema, insertLoginLogSchema
} from "@shared/schema";

// M-Pesa configuration
const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || "";
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || "";
const MPESA_BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE || "174379";
const MPESA_PASS_KEY = process.env.MPESA_PASS_KEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const MPESA_CALLBACK_URL = process.env.MPESA_CALLBACK_URL || "https://your-domain.repl.co/api/mpesa/callback";

// M-Pesa utility functions
const getTimestamp = () => {
  const date = new Date();
  return date.getFullYear() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0') +
    String(date.getHours()).padStart(2, '0') +
    String(date.getMinutes()).padStart(2, '0') +
    String(date.getSeconds()).padStart(2, '0');
};

const generatePassword = (timestamp: string) => {
  const password = `${MPESA_BUSINESS_SHORT_CODE}${MPESA_PASS_KEY}${timestamp}`;
  return Buffer.from(password).toString('base64');
};

const getAccessToken = async () => {
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
    throw new Error('M-Pesa credentials not configured');
  }
  
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get M-Pesa access token:', error);
    throw new Error('Failed to get M-Pesa access token');
  }
};

// Authentication middleware
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Public routes

  // Team members
  app.get("/api/team", async (req, res) => {
    try {
      const team = await storage.getAllTeamMembers();
      const activeTeam = team.filter(member => member.isActive);
      res.json(activeTeam);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Programs
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getActivePrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || !post.isPublished) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Merchandise
  app.get("/api/merchandise", async (req, res) => {
    try {
      const items = await storage.getActiveMerchandise();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch merchandise" });
    }
  });

  // Gallery
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getPublicGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // TODO: Send email notification using Nodemailer
      
      res.status(201).json({ message: "Contact message sent successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data" });
    }
  });

  // M-Pesa STK Push endpoint
  app.post("/api/mpesa/stkpush", async (req, res) => {
    try {
      const { phone, amount, donorName, donorEmail, message, accountReference } = req.body;
      
      if (!phone || !amount) {
        return res.status(400).json({ message: "Phone number and amount are required" });
      }

      if (amount <= 0) {
        return res.status(400).json({ message: "Valid amount is required" });
      }

      // Format phone number to ensure it starts with 254
      const formattedPhone = phone.startsWith('254') ? phone : 
                           phone.startsWith('0') ? '254' + phone.slice(1) : 
                           '254' + phone;

      const accessToken = await getAccessToken();
      const timestamp = getTimestamp();
      const password = generatePassword(timestamp);
      
      const stkPushData = {
        BusinessShortCode: MPESA_BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: MPESA_BUSINESS_SHORT_CODE,
        PhoneNumber: formattedPhone,
        CallBackURL: MPESA_CALLBACK_URL,
        AccountReference: accountReference || `VOH-${Date.now()}`,
        TransactionDesc: 'Donation to Voices of Hope CBO'
      };
      
      const response = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        stkPushData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Save donation record with M-Pesa transaction ID
      const donation = await storage.createDonation({
        amount: amount.toString(),
        currency: "KES",
        donorName: donorName || "Anonymous",
        donorEmail: donorEmail || "",
        message: message || "",
        isRecurring: false,
        mpesaCheckoutRequestId: response.data.CheckoutRequestID,
        status: "pending"
      });
      
      res.json({
        success: true,
        checkoutRequestId: response.data.CheckoutRequestID,
        customerMessage: response.data.CustomerMessage,
        donationId: donation.id
      });
      
    } catch (error: any) {
      console.error('M-Pesa STK Push error:', error.response?.data || error.message);
      res.status(500).json({
        success: false,
        message: "Error initiating M-Pesa payment: " + (error.response?.data?.errorMessage || error.message)
      });
    }
  });

  // M-Pesa callback endpoint
  app.post("/api/mpesa/callback", async (req, res) => {
    try {
      console.log('M-Pesa Callback received:', JSON.stringify(req.body, null, 2));
      
      const { Body } = req.body;
      const stkCallback = Body?.stkCallback;
      
      if (!stkCallback) {
        return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
      }

      const checkoutRequestId = stkCallback.CheckoutRequestID;
      const resultCode = stkCallback.ResultCode;
      
      if (resultCode === 0) {
        // Payment successful
        console.log('M-Pesa payment successful for:', checkoutRequestId);
        
        // Find and update donation record
        const donations = await storage.getAllDonations();
        const donation = donations.find(d => d.mpesaCheckoutRequestId === checkoutRequestId);
        
        if (donation) {
          // Extract transaction details
          const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];
          const transactionId = callbackMetadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
          
          await storage.updateDonationStatus(donation.id, "completed", transactionId);
          console.log(`Donation ${donation.id} marked as completed with M-Pesa receipt: ${transactionId}`);
        }
      } else {
        // Payment failed
        console.log('M-Pesa payment failed:', stkCallback.ResultDesc);
        
        const donations = await storage.getAllDonations();
        const donation = donations.find(d => d.mpesaCheckoutRequestId === checkoutRequestId);
        
        if (donation) {
          await storage.updateDonationStatus(donation.id, "failed");
        }
      }
      
      res.json({ ResultCode: 0, ResultDesc: "Accepted" });
    } catch (error: any) {
      console.error('M-Pesa callback error:', error);
      res.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }
  });

  // M-Pesa STK Push query endpoint
  app.post("/api/mpesa/query", async (req, res) => {
    try {
      const { checkoutRequestId } = req.body;
      
      if (!checkoutRequestId) {
        return res.status(400).json({ message: "CheckoutRequestID is required" });
      }

      const accessToken = await getAccessToken();
      const timestamp = getTimestamp();
      const password = generatePassword(timestamp);
      
      const queryData = {
        BusinessShortCode: MPESA_BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      };
      
      const response = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
        queryData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      res.json(response.data);
      
    } catch (error: any) {
      console.error('M-Pesa query error:', error.response?.data || error.message);
      res.status(500).json({ 
        message: "Error querying M-Pesa transaction: " + (error.response?.data?.errorMessage || error.message)
      });
    }
  });

  // Protected admin routes
  app.use("/api/admin", requireAuth);

  // Admin: Team management
  app.get("/api/admin/team", async (req, res) => {
    try {
      const team = await storage.getAllTeamMembers();
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.post("/api/admin/team", async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ message: "Invalid team member data" });
    }
  });

  app.put("/api/admin/team/:id", async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.partial().parse(req.body);
      const member = await storage.updateTeamMember(req.params.id, validatedData);
      res.json(member);
    } catch (error) {
      res.status(400).json({ message: "Failed to update team member" });
    }
  });

  app.delete("/api/admin/team/:id", async (req, res) => {
    try {
      await storage.deleteTeamMember(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });

  // Admin: Blog management
  app.get("/api/admin/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: req.user!.id
      });
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.put("/api/admin/blog/:id", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/:id", async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Admin: Events management
  app.get("/api/admin/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.post("/api/admin/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  app.put("/api/admin/events/:id", async (req, res) => {
    try {
      const validatedData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(req.params.id, validatedData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ message: "Failed to update event" });
    }
  });

  app.delete("/api/admin/events/:id", async (req, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // Admin: Programs management
  app.get("/api/admin/programs", async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  app.post("/api/admin/programs", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const program = await storage.createProgram(validatedData);
      res.status(201).json(program);
    } catch (error) {
      res.status(400).json({ message: "Invalid program data" });
    }
  });

  app.put("/api/admin/programs/:id", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.partial().parse(req.body);
      const program = await storage.updateProgram(req.params.id, validatedData);
      res.json(program);
    } catch (error) {
      res.status(400).json({ message: "Failed to update program" });
    }
  });

  app.delete("/api/admin/programs/:id", async (req, res) => {
    try {
      await storage.deleteProgram(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete program" });
    }
  });

  // Admin: Contact messages
  app.get("/api/admin/messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  app.put("/api/admin/messages/:id/read", async (req, res) => {
    try {
      const message = await storage.markContactMessageAsRead(req.params.id);
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  // Admin: Donations overview
  app.get("/api/admin/donations", async (req, res) => {
    try {
      const donations = await storage.getAllDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });

  // Admin: Gallery management
  app.get("/api/admin/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/admin/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ message: "Invalid gallery image data" });
    }
  });

  app.delete("/api/admin/gallery/:id", async (req, res) => {
    try {
      await storage.deleteGalleryImage(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery image" });
    }
  });

  // Admin: Login logs
  app.get("/api/admin/login-logs", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const logs = await storage.getRecentLoginLogs(limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch login logs" });
    }
  });

  // Admin: Get single blog post for editing
  app.get("/api/admin/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
