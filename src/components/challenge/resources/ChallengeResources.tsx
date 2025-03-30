
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MediaGrid } from "@/components/media/MediaGrid";
import { resourcesMock, getResourcesByCategory } from "@/data/resources";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, Music, Image, Library } from "lucide-react";
import { MediaResource } from "@/components/media/MediaModal";

export const ChallengeResources = () => {
  const { id } = useParams<{ id: string }>();
  const [resources, setResources] = useState<MediaResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate API call to fetch resources for this challenge
    const fetchResources = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API
        const data = id ? getResourcesByCategory(id) : resourcesMock;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [id]);

  // Filter resources based on active tab
  const filteredResources = activeTab === "all" 
    ? resources 
    : resources.filter(resource => resource.type === activeTab);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ressources</h2>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Library className="h-4 w-4" />
            <span>Tout</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Vidéos</span>
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>PDFs</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span>Audio</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span>Images</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-md"></div>
                  <div className="h-28 bg-card rounded-b-md p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-8 bg-muted rounded w-full mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredResources.length > 0 ? (
            <MediaGrid resources={filteredResources} columns={3} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune ressource disponible dans cette catégorie.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
