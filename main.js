(
    function(){
        const loadNotifications = () => {
            setTimeout(() => {
                console.log("Notification run js");
                createNotificationComponent();
            }, 1000);
        }
        
        const notificationType = { FOLLOW: "FOLLOW", COMMENT: "COMMENT", LIKE: "LIKE", MENTION: "MENTION" };
        const notificationStatus = { READ: "READ", UNREAD: "UNREAD" };
        const notificationPriority = { HIGHT: "HIGHT", NORMAL: "NORMAL", LOW: "LOW" };
        const colors = [
            "FFC0CB", // Rosa Pastel
            "A2CFFE", // Azul Bebé
            "D8B7DD", // Lila Claro
            "B4E1B4", // Verde Menta
            "FFFACD", // Amarillo Claro
            "E6E6FA", // Lavanda
            "FFB3AB"  // Coral Pastel
        ];

        const names = [
            "pedro",
            "luisa",
            "esteban",
            "catalina",
            "maria"
        ]

        const API_AVATAR = "https://api.dicebear.com/9.x/adventurer/svg?seed=";
        const data_original = [
            {
              id: 1,
              type: notificationType.FOLLOW,
              username: "Jong Doe",
              avatar: "https://example.com/avatars/john_doe.jpg",
              date: "2025-02-14T10:30:00Z",
              status: notificationStatus.UNREAD,
              priority: notificationPriority.NORMAL
            },
            {
              id: 2,
              type: notificationType.COMMENT,
              username: "Alice Smith",
              avatar: "https://example.com/avatars/alice.jpg",
              date: "2025-02-13T18:45:00Z",
              status: notificationStatus.READ,
              priority: notificationPriority.HIGHT
            },
            {
              id: 3,
              type: notificationType.LIKE,
              username: "Mark Johnson",
              avatar: "https://example.com/avatars/mark.jpg",
              date: "2025-02-12T09:00:00Z",
              status: notificationStatus.UNREAD,
              priority: notificationPriority.HIGHT
            },
            {
              id: 4,
              type: notificationType.MENTION,
              username: "Sarah Lee",
              avatar: "https://example.com/avatars/sarah.jpg",
              date: "2025-02-11T14:20:00Z",
              status: notificationStatus.READ,
              priority: notificationPriority.LOW
            }
        ];
        
        const createContainer = () => {
            const notificationContainer = document.createElement("div");
            notificationContainer.classList.add("notification__main", "fade");
            return notificationContainer;
        }

        const createTagNotifications = () => {
            const notificationTag = document.createElement("div");
            notificationTag.classList.add("notification__tag");
            notificationTag.innerText = data_original.length.toString();
            return notificationTag;
        }

        const createButtonNotification = () => {
            const notificationButton = document.createElement("button");
            notificationButton.textContent = "Marcar todas leídas";
            notificationButton.classList.add("notification__button");
            return notificationButton;
        }

        const createPictureNotification = () => {
            const notificationPicture = document.createElement("div");
            notificationPicture.classList.add("notification__picture");
            const nameRamdon = getNameRandomUser();
            console.log("nameRamdon: ", nameRamdon);
            notificationPicture.style.backgroundImage = "url(" + getUserAvatar(nameRamdon) + ")";
            return notificationPicture;
        }
        
        const createHeader = () => {
            const notificationHeader = document.createElement("div");
            notificationHeader.classList.add("notification__header");

            const notificationTitleContainer = document.createElement("div");
            notificationTitleContainer.classList.add("notification__title__container")

            const notificationTitle = document.createElement("h2");
            notificationTitle.classList.add("notification__title");
            notificationTitle.textContent = "Notificaciones";

            notificationTitleContainer.appendChild(notificationTitle);
            notificationTitleContainer.appendChild(createTagNotifications());

            notificationHeader.appendChild(notificationTitleContainer);
            notificationHeader.appendChild(createButtonNotification());

            return notificationHeader;
        }
        
        const createBody = () => {
            const notificationBody = document.createElement("div");
            notificationBody.classList.add("notification__body");
            return notificationBody;
        }

        const getMessageByTypeNotification = (notification) => {
            let message = "";
            const { type, username } = notification;

            switch(type) {
                case notificationType.FOLLOW:  
                message = " te ha comenzado a seguir";
                break;
                case notificationType.COMMENT: 
                message = " ha comentado tu foto";
                break;
                case notificationType.LIKE: 
                message = " le ha dado me gusta a tu foto";
                break;
                case notificationType.MENTION: 
                message = " te ha mensionado en un comentario";
                break;
                default: 
                throw new Error("Opción no válida!");
            }
            
            return "<span class='notification__username'>" + username + "</span>" + message;
        }
        
        const getUserAvatar =  (username = "") => {
            const response =  API_AVATAR + username.split(" ").join("+");
            return response;
        }

        const getTimeNotification = (dateString) => {
            const now = new Date();
            const date = new Date(dateString.split('/').reverse().join('-')); // Convertir el formato dd/mm/yyyy a yyyy-mm-dd
            
            const diffInSeconds = Math.floor((now - date) / 1000); // Diferencia en segundos
            
            const secondsInMinute = 60;
            const secondsInHour = 60 * 60;
            const secondsInDay = 24 * 60 * 60;
            const secondsInMonth = 30 * 24 * 60 * 60;
            const secondsInYear = 365 * 24 * 60 * 60;
            
            if (diffInSeconds < secondsInMinute) {
              return diffInSeconds <= 1 ? "Hace un segundo" : `Hace ${diffInSeconds} segundos`;
            } else if (diffInSeconds < secondsInHour) {
              const minutes = Math.floor(diffInSeconds / secondsInMinute);
              return minutes <= 1 ? "Hace un minuto" : `Hace ${minutes} minutos`;
            } else if (diffInSeconds < secondsInDay) {
              const hours = Math.floor(diffInSeconds / secondsInHour);
              return hours <= 1 ? "Hace una hora" : `Hace ${hours} horas`;
            } else if (diffInSeconds < secondsInMonth) {
              const days = Math.floor(diffInSeconds / secondsInDay);
              return days <= 1 ? "Hace un día" : `Hace ${days} días`;
            } else if (diffInSeconds < secondsInYear) {
              const months = Math.floor(diffInSeconds / secondsInMonth);
              return months <= 1 ? "Hace un mes" : `Hace ${months} meses`;
            } else {
              const years = Math.floor(diffInSeconds / secondsInYear);
              return years <= 1 ? "Hace un año" : `Hace ${years} años`;
            }
        }

        const getNameRandomUser = () => {
            return names[Math.floor(Math.random() * names.length)];
        }
        
        const createNotification = (notification) => {
            
            const { type, username, date, status } = notification;
            const image_avatar = getUserAvatar(username);
            let message = getMessageByTypeNotification({type, username});
            
            const notificationContainer = document.createElement("div");
            notificationContainer.classList.add("notification__container");

            if(status == notificationStatus.UNREAD)
                notificationContainer.classList.add("notification__unread");

            const notificationAvatar = document.createElement("div");
            notificationAvatar.classList.add("notification__avatar");
            notificationAvatar.style.backgroundImage = "url(" + image_avatar + ")";
            
            const notificationDate = document.createElement("p");
            notificationDate.classList.add("notification__date");
            notificationDate.textContent = getTimeNotification(new Date(date).toLocaleDateString());
            
            const notificationInfoMessage = document.createElement("div");
            notificationInfoMessage.classList.add("notification__infomessage");

            const notificationDescription = document.createElement("p");
            notificationDescription.classList.add("notification__description");
            notificationDescription.innerHTML = message;

            const notificationUserInfo = document.createElement("div");
            notificationUserInfo.classList.add("notification_userinfo");

            notificationInfoMessage.appendChild(notificationDescription);
            notificationInfoMessage.appendChild(notificationDate);

            notificationUserInfo.appendChild(notificationAvatar);
            notificationUserInfo.appendChild(notificationInfoMessage);
            
            notificationContainer.appendChild(notificationUserInfo);
            notificationContainer.appendChild(createPictureNotification());
            
            return notificationContainer;
        }
               
        const createNotificationComponent = () => {

            const notificationContainer = createContainer();
            const notificationHeader = createHeader();
            const notificationBody = createBody();

            notificationContainer.appendChild(notificationHeader);
            notificationContainer.appendChild(notificationBody);
            
            for(let notification of data_original) {
                const elementNotification = createNotification(notification);
                notificationBody.appendChild(elementNotification);
            }

            document.body.appendChild(notificationContainer);
        }

        loadNotifications();        
    }
)()