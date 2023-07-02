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

## F) "Persönliche Profile"- Schnittstellen

1. Erhalten einer Liste aller persönlichen Profile:

    `GET /profile/personal_profiles`

2. Erhalten liste aller persönlichen Profile sortiert nach Ähnlichkeitsmaß:

    `GET /profile/sorted/<int:id>`

3. Erhalten eines persönlichen Profils via ID:

    `GET /profile/<int:id>`

4. Löschen eines persönlichen Profils via ID:

    `DELETE /profile/<int:id>`

5. Erhalten eines persönlichen Profils via User ID:

    `GET /profile/by_user/<int:id>`

6. Erstellen eines persönlichen Profils für einen User via User ID:

    `POST /profile/by_user/<int:id>`


## G) "SearchProfile"- Schnittstellen

1. Erhalte eine Liste aller Suchprofile eines Users:

    `GET /searchprofile/by_user/<user_id>`

2. Erstellen eines neuen Suchprofils für einen User:

    `POST /searchprofile/by_user/<user_id>`

3. Erhalten eines Suchprofils via ID:

    `GET /searchprofile/<int:id>`

4. Löschen eines Suchprofils via ID:
    
   `DELETE /searchprofile/<int:id>`

## H) "Selection Property"- Schnittstellen

1. Erhalten einer Auswahleigenschaft via ID:

    `GET /selection_property/<int:id>` 

2. Aktualisieren einer Auswahleigenschaft via ID:

    `PUT /selection_property/<int:id>`

3. Löschen einer Auswahleigenschaft via ID:

    `DELETE /selection_property/<int:id>`

4. Erstellen einer Auswahleigenschaft:
    
   `POST /selection_property/selection_properties`

5. Erhalten einer Liste aller Auswahleigenschaften

    `GET /selection_property/selection_properties`

6. Erhalten aller auswählbaren Informationen zu einer Auswahleigenschaft:

    `GET /selection_property/options/<int:id>`

7. Hinzufügen einer auswählbaren Information zu einer Auswahleigenschaft:

    `POST /selection_property/options/<int:id>`

8. Löschen einer auswählbaren Information zu einer Auswahleigenschaft:

    `DELETE /selection_property/options/<int:id>`

9. Aktualisieren einer auswählbaren Information zu einer Auswahleigenschaft:

    `PUT /selection_property/options/<int:id>`

## I) "Text Property"- Schnittstellen

1. Erhalten einer Texteigenschaft via ID:

    `GET /text_property/<int:id>`

2. Aktualisieren einer Texteigenschaft via ID:

    `PUT /text_property/<int:id>`

3. Löschen einer Texteigenschaft via ID:

    `DELETE /text_property/<int:id>`

4. Erstellen einer Texteigenschaft:

   `POST /text_property/text_properties`

5. Erhalten einer Liste aller Texteigenschaften:

    `GET /text_property/text_properties`

6. Hinzufügen eines Eintrags für eine ausgewähle Texteigenschaft:

    `POST /text_property/entries/<int:id>`
7. Aktualisieren eines Eintrags für eine ausgewähle Texteigenschaft:

    `PUT /text_property/entries/<int:id>`

## J) "Information"- Schnittstellen

1. Hinzufügen einer Information zu einem Profil:

    `POST /information/<int:id>`

2. Erhalten einer Information via ID:

    `GET /information/<int:id>`
3. Aktualisieren einer Information via ID:

    `PUT /information/<int:id>`
4. Löschen einer Information via ID:
    
   `DELETE /information/<int:id>`

5. Erhalten einer Liste aller Informationen eines Profils:

    `GET /information/infos/<int:id>`

6. Erhalten des Inhalts einer Information: 

    `GET /information/content/<int:id>`

## K) "User"- Schnittstellen

1. Erhalten der  User ID via Email:

    `GET /user/<string:email>`

2. Erhalten eines Users via ID:

    `GET /user/<int:id>`
3. Erstellen eines Users:

    `POST /user/<int:id>`

4. Löschen eines Users via ID:
    
   `DELETE /user/<int:id>`

5. Aktualisieren eines Users via ID:

    `PUT /user/<int:id>`
6. Erhalten einer Liste aller User:

    `GET /all_users/<int:id>`


### Allgemeine Informationen: 

- Post -> Erstellt bzw. Fügt neue Einträge in die Datenbank hinzu
- Get -> Liest Einträge aus der Datenbank aus
- Put -> Aktualisiert Einträge in der Datenbank
- Delete -> Löscht Einträge aus der Datenbank