from src.server.bo.User import User
from src.server.bo.Bookmarklist import Bookmarklist
from src.server.db.Mapper import Mapper

import json


class BookmarklistMapper(Mapper):

    def __init__(self):
        super().__init__()
        pass

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM bookmarklist")
        tuples = cursor.fetchall()

        for (id) in tuples:
            bookmarklist = Bookmarklist()
            bookmarklist.set_id(id)
            result.append(bookmarklist)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, user_id):
        """
        Returns a list of all other users a user(with a user_id) has on his bookmark list
        :param user_id: the unique id of the user
        :return: a list of all bookmarked users. If there is no bookmarked user it will return an empty list.
        """
        result = []
        cursor = self._cnx.cursor()

        # Bookmarklist anhand der UserID abrufen
        command = "SELECT * FROM bookmarklist WHERE UserID={}".format(user_id)
        cursor.execute(command)
        bookmarklist_tuple = cursor.fetchone()

        if bookmarklist_tuple is not None:
            bookmarklist_id = bookmarklist_tuple[0]

            # Retrieve bookmarklist by UserID
            command2 = "SELECT * FROM bookmark WHERE BookmarklistID={}".format(bookmarklist_id)
            cursor.execute(command2)
            bookmarks = cursor.fetchall()

            if bookmarks is not None:
                user_ids = [bookmark[2] for bookmark in bookmarks]

                # Retrieve user by UserID
                command3 = "SELECT * FROM user WHERE UserID IN ({})".format(','.join(str(uid) for uid in user_ids))
                cursor.execute(command3)
                users = cursor.fetchall()

                # Form the user into a json and add it to the list
                for user in users:
                    jsstr = f'{{"id": "{user[0]}", "email": "{user[1]}", "firstname": "{user[2]}", "lastname": "{user[3]}"}}'
                    userJSON = json.loads(jsstr)
                    result.append(userJSON)

        cursor.close()
        return result

    def insert(self, user_id, bookmarklist):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(BookmarklistID) AS maxid FROM bookmarklist ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            bookmarklist.set_id(maxid[0] + 1)

        command = "INSERT INTO bookmarklist (UserID,BookmarklistID) VALUES (%s, %s)"
        data = (user_id, bookmarklist.get_id())  # TODO: ist user_id richtig übergeben?
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return bookmarklist

    def update(self, bookmarklist):
        cursor = self._cnx.cursor()

        command = "UPDATE bookmarklist SET BookmarklistID=%s WHERE BookmarklistID=%s"
        data = (bookmarklist.get_id(), bookmarklist.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, bookmarklist):
        cursor = self._cnx.cursor()

        command = "DELETE FROM bookmarklist WHERE BookmarklistID={}".format(
            bookmarklist.get_id())  # TODO: .get_id()? oder bookmarklist
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass
