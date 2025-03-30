
import { MediaResource } from "@/components/media/MediaModal";

export const resourcesMock: MediaResource[] = [
  {
    id: "1",
    title: "Introduction à la programmation",
    type: "video",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Une vidéo d'introduction aux concepts fondamentaux de la programmation.",
    thumbnail: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "10:30"
  },
  {
    id: "2",
    title: "Guide de démarrage rapide",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Un guide pas à pas pour vous aider à démarrer avec notre plateforme.",
    fileSize: "2.1 MB"
  },
  {
    id: "3",
    title: "Podcast sur les tendances technologiques",
    type: "audio",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    description: "Discussion sur les dernières tendances technologiques et leur impact.",
    duration: "25:18"
  },
  {
    id: "4",
    title: "Architecture moderne",
    type: "image",
    url: "https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Une image illustrant les principes de l'architecture moderne.",
    thumbnail: "https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "5",
    title: "Les bases du marketing digital",
    type: "video",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    description: "Un cours complet sur les fondamentaux du marketing digital.",
    thumbnail: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "45:10"
  },
  {
    id: "6",
    title: "Livre blanc sur la cybersécurité",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "Un document détaillé sur les meilleures pratiques en cybersécurité.",
    fileSize: "3.4 MB"
  }
];

export const getResourcesByCategory = (category: string): MediaResource[] => {
  // In a real app, this would filter based on category
  return resourcesMock;
};

export const getResourceById = (id: string): MediaResource | undefined => {
  return resourcesMock.find(resource => resource.id === id);
};
