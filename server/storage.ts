import { 
  users, teamMembers, blogPosts, programs, events, donations, 
  merchandise, contactMessages, galleryImages,
  type User, type InsertUser, type TeamMember, type InsertTeamMember,
  type BlogPost, type InsertBlogPost, type Program, type InsertProgram,
  type Event, type InsertEvent, type Donation, type InsertDonation,
  type Merchandise, type InsertMerchandise, type ContactMessage, 
  type InsertContactMessage, type GalleryImage, type InsertGalleryImage
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Team Members
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;

  // Programs
  getAllPrograms(): Promise<Program[]>;
  getActivePrograms(): Promise<Program[]>;
  getProgram(id: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program>;
  deleteProgram(id: string): Promise<void>;

  // Events
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;

  // Donations
  getAllDonations(): Promise<Donation[]>;
  getDonation(id: string): Promise<Donation | undefined>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: string, status: string, receiptNumber?: string): Promise<Donation>;

  // Merchandise
  getAllMerchandise(): Promise<Merchandise[]>;
  getActiveMerchandise(): Promise<Merchandise[]>;
  getMerchandiseItem(id: string): Promise<Merchandise | undefined>;
  createMerchandise(item: InsertMerchandise): Promise<Merchandise>;
  updateMerchandise(id: string, item: Partial<InsertMerchandise>): Promise<Merchandise>;
  deleteMerchandise(id: string): Promise<void>;

  // Contact Messages
  getAllContactMessages(): Promise<ContactMessage[]>;
  getUnreadContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: string): Promise<ContactMessage>;

  // Gallery Images
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getPublicGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<void>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Team Members
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(desc(teamMembers.createdAt));
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member || undefined;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  async updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [updatedMember] = await db.update(teamMembers)
      .set(member)
      .where(eq(teamMembers.id, id))
      .returning();
    return updatedMember;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db.update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Programs
  async getAllPrograms(): Promise<Program[]> {
    return await db.select().from(programs).orderBy(desc(programs.createdAt));
  }

  async getActivePrograms(): Promise<Program[]> {
    return await db.select().from(programs)
      .where(eq(programs.isActive, true))
      .orderBy(desc(programs.createdAt));
  }

  async getProgram(id: string): Promise<Program | undefined> {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program || undefined;
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const [newProgram] = await db.insert(programs).values(program).returning();
    return newProgram;
  }

  async updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program> {
    const [updatedProgram] = await db.update(programs)
      .set(program)
      .where(eq(programs.id, id))
      .returning();
    return updatedProgram;
  }

  async deleteProgram(id: string): Promise<void> {
    await db.delete(programs).where(eq(programs.id, id));
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.startDate));
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return await db.select().from(events)
      .where(and(eq(events.isPublic, true)))
      .orderBy(events.startDate);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event> {
    const [updatedEvent] = await db.update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Donations
  async getAllDonations(): Promise<Donation[]> {
    return await db.select().from(donations).orderBy(desc(donations.createdAt));
  }

  async getDonation(id: string): Promise<Donation | undefined> {
    const [donation] = await db.select().from(donations).where(eq(donations.id, id));
    return donation || undefined;
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const [newDonation] = await db.insert(donations).values(donation).returning();
    return newDonation;
  }

  async updateDonationStatus(id: string, status: string, receiptNumber?: string): Promise<Donation> {
    const updateData: any = { status };
    if (receiptNumber) {
      updateData.mpesaReceiptNumber = receiptNumber;
    }
    
    const [updatedDonation] = await db.update(donations)
      .set(updateData)
      .where(eq(donations.id, id))
      .returning();
    return updatedDonation;
  }

  // Merchandise
  async getAllMerchandise(): Promise<Merchandise[]> {
    return await db.select().from(merchandise).orderBy(desc(merchandise.createdAt));
  }

  async getActiveMerchandise(): Promise<Merchandise[]> {
    return await db.select().from(merchandise)
      .where(eq(merchandise.isActive, true))
      .orderBy(desc(merchandise.createdAt));
  }

  async getMerchandiseItem(id: string): Promise<Merchandise | undefined> {
    const [item] = await db.select().from(merchandise).where(eq(merchandise.id, id));
    return item || undefined;
  }

  async createMerchandise(item: InsertMerchandise): Promise<Merchandise> {
    const [newItem] = await db.insert(merchandise).values(item).returning();
    return newItem;
  }

  async updateMerchandise(id: string, item: Partial<InsertMerchandise>): Promise<Merchandise> {
    const [updatedItem] = await db.update(merchandise)
      .set(item)
      .where(eq(merchandise.id, id))
      .returning();
    return updatedItem;
  }

  async deleteMerchandise(id: string): Promise<void> {
    await db.delete(merchandise).where(eq(merchandise.id, id));
  }

  // Contact Messages
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getUnreadContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages)
      .where(eq(contactMessages.isRead, false))
      .orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async markContactMessageAsRead(id: string): Promise<ContactMessage> {
    const [updatedMessage] = await db.update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return updatedMessage;
  }

  // Gallery Images
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
  }

  async getPublicGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages)
      .where(eq(galleryImages.isPublic, true))
      .orderBy(desc(galleryImages.createdAt));
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    const [image] = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
    return image || undefined;
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [newImage] = await db.insert(galleryImages).values(image).returning();
    return newImage;
  }

  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    const [updatedImage] = await db.update(galleryImages)
      .set(image)
      .where(eq(galleryImages.id, id))
      .returning();
    return updatedImage;
  }

  async deleteGalleryImage(id: string): Promise<void> {
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
  }
}

export const storage = new DatabaseStorage();
