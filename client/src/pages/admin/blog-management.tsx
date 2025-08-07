import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import type { BlogPost } from "@shared/schema";

const blogFormSchema = insertBlogPostSchema.extend({
  slug: z.string().min(1, "Slug is required"),
});

type BlogFormData = z.infer<typeof blogFormSchema>;

export default function BlogManagement() {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
  });

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      isPublished: false,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: BlogFormData) => apiRequest("/api/admin/blog", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Blog post created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create blog post", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogFormData> }) =>
      apiRequest(`/api/admin/blog/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setIsDialogOpen(false);
      setEditingPost(null);
      form.reset();
      toast({ title: "Blog post updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update blog post", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/admin/blog/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({ title: "Blog post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete blog post", variant: "destructive" });
    },
  });

  const handleSubmit = (data: BlogFormData) => {
    // Generate slug from title if empty
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || "",
      isPublished: post.isPublished,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingPost(null);
    form.reset({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      isPublished: false,
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-earth-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-earth-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="font-serif text-4xl font-bold text-primary mb-2">Blog Management</h1>
              <p className="text-gray-600">Create and manage blog posts for your website</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog} data-testid="button-create-blog">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingPost ? "Update the blog post details below." : "Fill in the details to create a new blog post."}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        {...form.register("title")}
                        placeholder="Enter blog post title"
                        data-testid="input-blog-title"
                      />
                      {form.formState.errors.title && (
                        <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        {...form.register("slug")}
                        placeholder="url-friendly-slug (auto-generated if empty)"
                        data-testid="input-blog-slug"
                      />
                      {form.formState.errors.slug && (
                        <p className="text-sm text-red-600">{form.formState.errors.slug.message}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        {...form.register("excerpt")}
                        placeholder="Brief description of the blog post"
                        rows={3}
                        data-testid="textarea-blog-excerpt"
                      />
                      {form.formState.errors.excerpt && (
                        <p className="text-sm text-red-600">{form.formState.errors.excerpt.message}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        {...form.register("content")}
                        placeholder="Write your blog post content here (supports basic HTML)"
                        rows={8}
                        data-testid="textarea-blog-content"
                      />
                      {form.formState.errors.content && (
                        <p className="text-sm text-red-600">{form.formState.errors.content.message}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">Featured Image URL</Label>
                      <Input
                        id="imageUrl"
                        {...form.register("imageUrl")}
                        placeholder="https://example.com/image.jpg (optional)"
                        data-testid="input-blog-image"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isPublished"
                        checked={form.watch("isPublished")}
                        onCheckedChange={(checked) => form.setValue("isPublished", checked)}
                        data-testid="switch-blog-published"
                      />
                      <Label htmlFor="isPublished">Publish immediately</Label>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      data-testid="button-save-blog"
                    >
                      {createMutation.isPending || updateMutation.isPending
                        ? "Saving..."
                        : editingPost
                        ? "Update Post"
                        : "Create Post"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blog Posts List */}
          <div className="grid gap-6">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {post.title}
                          <Badge variant={post.isPublished ? "default" : "secondary"}>
                            {post.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">Slug:</span> /{post.slug}
                        </CardDescription>
                        <CardDescription className="mt-1">
                          {post.excerpt}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        {post.isPublished && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            data-testid={`button-view-blog-${post.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(post)}
                          data-testid={`button-edit-blog-${post.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this blog post?")) {
                              deleteMutation.mutate(post.id);
                            }
                          }}
                          data-testid={`button-delete-blog-${post.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      {post.publishedAt && (
                        <p>
                          <span className="font-medium">Published:</span>{" "}
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      )}
                      {post.imageUrl && (
                        <p>
                          <span className="font-medium">Featured Image:</span>{" "}
                          <a
                            href={post.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Image
                          </a>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first blog post to share updates and stories with your community.
                  </p>
                  <Button onClick={openCreateDialog} data-testid="button-create-first-blog">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}