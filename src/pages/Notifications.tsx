
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bell, Trophy, LineChart, Gift, CheckCircle2, User, DollarSign, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "achievement",
    title: "Nouveau badge obtenu",
    description: "Vous avez obtenu le badge « Investisseur novice »",
    icon: <Trophy className="h-5 w-5" />,
    date: "Aujourd'hui",
    read: false
  },
  {
    id: 2,
    type: "challenge",
    title: "Défi Crypto",
    description: "N'oubliez pas de continuer votre défi sur les cryptomonnaies",
    icon: <BookOpen className="h-5 w-5" />,
    date: "Hier",
    read: false
  },
  {
    id: 3,
    type: "simulator",
    title: "Nouveau simulateur disponible",
    description: "Testez le nouveau simulateur d'analyse de tendances",
    icon: <LineChart className="h-5 w-5" />,
    date: "Il y a 2 jours",
    read: true
  },
  {
    id: 4,
    type: "reward",
    title: "Bonus quotidien",
    description: "Vous avez reçu 20 XP pour votre connexion quotidienne",
    icon: <Gift className="h-5 w-5" />,
    date: "Il y a 3 jours",
    read: true
  },
  {
    id: 5,
    type: "system",
    title: "Profil complété",
    description: "Merci d'avoir complété votre profil utilisateur",
    icon: <User className="h-5 w-5" />,
    date: "Il y a 1 semaine",
    read: true
  },
  {
    id: 6,
    type: "promo",
    title: "Offre spéciale",
    description: "30% de réduction sur l'abonnement Premium ce week-end",
    icon: <DollarSign className="h-5 w-5" />,
    date: "Il y a 1 semaine",
    read: true
  }
];

// Group notifications by date
const groupNotificationsByDate = (notifications) => {
  const groups = {
    "Aujourd'hui": [],
    "Hier": [],
    "Cette semaine": [],
    "Ce mois-ci": [],
    "Plus ancien": []
  };
  
  notifications.forEach(notification => {
    if (notification.date === "Aujourd'hui") {
      groups["Aujourd'hui"].push(notification);
    } else if (notification.date === "Hier") {
      groups["Hier"].push(notification);
    } else if (notification.date.includes("jours")) {
      groups["Cette semaine"].push(notification);
    } else if (notification.date.includes("semaine")) {
      groups["Ce mois-ci"].push(notification);
    } else {
      groups["Plus ancien"].push(notification);
    }
  });
  
  return Object.entries(groups).filter(([_, notifications]) => notifications.length > 0);
};

const Notifications = () => {
  const navigate = useNavigate();
  const [userNotifications, setUserNotifications] = useState(notifications);
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    document.title = "FinQuest - Notifications";
    // Count unread notifications
    const count = userNotifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [userNotifications]);
  
  const markAllAsRead = () => {
    setUserNotifications(userNotifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  
  const markAsRead = (id) => {
    setUserNotifications(userNotifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Get background color based on notification type
  const getNotificationColor = (type) => {
    switch (type) {
      case "achievement":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "challenge":
        return "bg-primary/10 border-primary/30";
      case "simulator":
        return "bg-blue-500/10 border-blue-500/30";
      case "reward":
        return "bg-green-500/10 border-green-500/30";
      case "system":
        return "bg-secondary/20 border-secondary/40";
      case "promo":
        return "bg-purple-500/10 border-purple-500/30";
      default:
        return "bg-secondary/20 border-secondary/40";
    }
  };
  
  // Group notifications by date
  const groupedNotifications = groupNotificationsByDate(userNotifications);
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au profil
              </Button>
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="ml-3 bg-primary">{unreadCount} non lues</Badge>
              )}
            </div>
            
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
          
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary" />
                Centre de notifications
              </CardTitle>
              <CardDescription>
                Restez informé des dernières mises à jour et événements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {groupedNotifications.length > 0 ? (
                <div className="space-y-6">
                  {groupedNotifications.map(([dateGroup, notifications]) => (
                    <div key={dateGroup}>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">{dateGroup}</h3>
                      <div className="space-y-3">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} ${!notification.read ? 'ring-1 ring-primary' : ''}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`rounded-full p-2 ${notification.type === 'achievement' ? 'bg-yellow-500/20' : notification.type === 'challenge' ? 'bg-primary/20' : notification.type === 'simulator' ? 'bg-blue-500/20' : notification.type === 'reward' ? 'bg-green-500/20' : notification.type === 'promo' ? 'bg-purple-500/20' : 'bg-secondary/20'}`}>
                                {notification.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{notification.title}</h4>
                                  {!notification.read && (
                                    <Badge className="bg-primary">Nouveau</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                                <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aucune notification</h3>
                  <p className="text-muted-foreground">
                    Vous n'avez aucune notification pour le moment
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
