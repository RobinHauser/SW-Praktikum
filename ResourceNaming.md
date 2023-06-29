# Resource Naming

## Erklärung
Um mit einem Flask Rest-Server arbeiten zu können benötigen wir Schnittstellen, welche
vom Frontend aus gecallt werden können. Hierfür ist eine Konsitenz in der Namensgebung
der Schnittstellen notwendig. Die Namensgebung der Schnittstellen ist in diesem Dokument
beschrieben.


## A) "Bookmarklist"- Schnittstellen

1. Erhalten der Merkliste eines Users:

    `GET /bookmarklist/<user_id>`

2. Hinzufügen Users zur Merkliste:
    
   `POST /bookmarklist/<user_id>`

3. Entfernen eines Users von der Merkliste:

    `DELETE /bookmarklist/<user_id>`

## B) "Blocklist"- Schnittstellen

1. Erhalten der vollständigen Blockliste eines Users:

    `GET /blocklist/<user_id>`

2. Hinzufügen eines Users zur Blockliste:

    `POST /blocklist/<user_id>`

3. Entfernen eines Users von der Blockliste:

    `DELETE /blocklist/<user_id>`

## C) "View"- Schnittstellen

1. Erhalten einer Liste der vom User bereits gesehen User:

    `GET /view/<user_id>`

2. Hinzufügen eines Users zur Viewliste:

    `POST /view/<user_id>`

3. Entfernen eines Users von der Viewliste:

    `DELETE /view/<user_id>`

## D) "Chat"- Schnittstellen

1. Erhalten einer Liste der Chats eines Users:

    `GET /chat/<user_id>`

2. Starten eines Neuen Chats mit einem User:

    `POST /chat/<user_id>`

## E) "Message"- Schnittstellen

1. Erhalten einer Liste der Nachrichten eines Chats:

    `GET /message/<chat_id>`

2. Senden einer Nachricht an einen Chat:
    
   `POST /message/<chat_id>`

## F) "Profile"- Schnittstellen

1. Erhalten eines Profils eines Users:

    `GET /profile/<user_id>`

2. Aktualisieren eines Profils eines Users:

    `PUT /profile/<user_id>`

## G) "SearchProfile"- Schnittstellen

1. Erhalte eine Liste aller Suchprofile eines Users:

    `GET /searchprofile/<user_id>`

2. Aktualisieren eines Suchprofils eines Users:

    `PUT /searchprofile/<user_id>`

3. Löschen eines Suchprofils eines Users:

    `DELETE /searchprofile/<user_id>`

4. Erstellen eines Suchprofils:

    `POST /searchprofile/<user_id>`

## H) "User"- Schnittstellen

1. Erhalten eines Users:

    `GET /user/<user_id>`


### Allgemeine Informationen: 

- Post -> Erstellt bzw. Fügt neue Einträge in die Datenbank hinzu
- Get -> Liest Einträge aus der Datenbank aus
- Put -> Aktualisiert Einträge in der Datenbank
- Delete -> Löscht Einträge aus der Datenbank