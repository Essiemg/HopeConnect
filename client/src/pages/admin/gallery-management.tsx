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
import { insertGalleryImageSchema } from "@shared/schema";
import { z } from "zod";
import { Plus, Trash2, Upload, Image as ImageIcon, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import type { GalleryImage } from "@shared/schema";

const galleryFormSchema = insertGalleryImageSchema;
type GalleryFormData = z.infer<typeof galleryFormSchema>;

export default function GalleryManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { toast } = useToast();

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/admin/gallery"],
  });

  const form = useForm<GalleryFormData>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      isPublic: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: GalleryFormData) => apiRequest("/api/admin/gallery", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Image uploaded successfully" });
    },
    onError: () => {
      toast({ title: "Failed to upload image", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/admin/gallery/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Image deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete image", variant: "destructive" });
    },
  });

  const handleSubmit = (data: GalleryFormData) => {
    createMutation.mutate(data);
  };

  const openCreateDialog = () => {
    form.reset({
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      isPublic: true,
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-300 rounded"></div>
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
              <h1 className="font-serif text-4xl font-bold text-primary mb-2">Photo Gallery</h1>
              <p className="text-gray-600">Upload and manage photos for your website gallery</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog} data-testid="button-upload-photo">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Upload New Photo</DialogTitle>
                    <DialogDescription>
                      Add a new image to your gallery. For best results, use Cloudinary or another image hosting service.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        {...form.register("imageUrl")}
                        placeholder="https://res.cloudinary.com/your-image.jpg"
                        data-testid="input-image-url"
                      />
                      {form.formState.errors.imageUrl && (
                        <p className="text-sm text-red-600">{form.formState.errors.imageUrl.message}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Upload your image to Cloudinary or another hosting service first, then paste the URL here.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        {...form.register("title")}
                        placeholder="Enter image title"
                        data-testid="input-image-title"
                      />
                      {form.formState.errors.title && (
                        <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        {...form.register("description")}
                        placeholder="Brief description of the image"
                        rows={3}
                        data-testid="textarea-image-description"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="category">Category (Optional)</Label>
                      <Input
                        id="category"
                        {...form.register("category")}
                        placeholder="e.g., Events, Programs, Team"
                        data-testid="input-image-category"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isPublic"
                        checked={form.watch("isPublic")}
                        onCheckedChange={(checked) => form.setValue("isPublic", checked)}
                        data-testid="switch-image-public"
                      />
                      <Label htmlFor="isPublic">Make public (visible on website)</Label>
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
                      disabled={createMutation.isPending}
                      data-testid="button-save-image"
                    >
                      {createMutation.isPending ? "Uploading..." : "Upload Photo"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-6">
            {images && images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative bg-gray-100">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-200">
                        <div className="text-center text-gray-500">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Image failed to load</p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant={image.isPublic ? "default" : "secondary"} className="bg-white/90 text-gray-800">
                          {image.isPublic ? "Public" : "Private"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg leading-tight">{image.title}</CardTitle>
                          {image.category && (
                            <CardDescription className="mt-1">
                              <Badge variant="outline" className="text-xs">
                                {image.category}
                              </Badge>
                            </CardDescription>
                          )}
                        </div>
                        <div className="flex space-x-1 ml-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedImage(image)}
                            data-testid={`button-view-image-${image.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this image?")) {
                                deleteMutation.mutate(image.id);
                              }
                            }}
                            data-testid={`button-delete-image-${image.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {image.description && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                      </CardContent>
                    )}
                    <CardContent className="pt-0">
                      <p className="text-xs text-gray-500">
                        Uploaded {new Date(image.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
                  <p className="text-gray-500 mb-4">
                    Upload your first photo to start building your gallery.
                  </p>
                  <div className="space-y-3">
                    <Button onClick={openCreateDialog} data-testid="button-upload-first-photo">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Your First Photo
                    </Button>
                    <div className="text-xs text-gray-500 max-w-md mx-auto">
                      <p className="font-medium mb-1">Quick Guide:</p>
                      <p>1. Upload images to Cloudinary or similar service</p>
                      <p>2. Copy the image URL</p>
                      <p>3. Paste it here with title and description</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Image Preview Dialog */}
          {selectedImage && (
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedImage.title}</DialogTitle>
                  {selectedImage.description && (
                    <DialogDescription>{selectedImage.description}</DialogDescription>
                  )}
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full max-h-[60vh] object-contain rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Category:</span> {selectedImage.category || "None"}</p>
                      <p><span className="font-medium">Visibility:</span> {selectedImage.isPublic ? "Public" : "Private"}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Uploaded:</span> {new Date(selectedImage.createdAt).toLocaleDateString()}</p>
                      <p>
                        <span className="font-medium">URL:</span>{" "}
                        <a
                          href={selectedImage.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all"
                        >
                          View Original
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </Layout>
  );
}