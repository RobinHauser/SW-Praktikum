import json

from src.server.db.Mapper import Mapper


class BookmarklistMapper(Mapper):

    def __init__(self):
        super().__init__()
        pass

    def find_all(self):
        pass

    def find_by_id(self, user_id):
        """
        Returns a list of all other users a user(with a user_id) has on his bookmark list
        :param user_id: the unique id of the user
        :return: a list of all bookmarked users. If there is no bookmarked user it will return an empty list.
        """
        result = []
        cursor = self._cnx.cursor()

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
                    jsstr = f'{{"UserID": "{user[0]}", "email": "{user[1]}", "displayname": "{user[2]}"' \
                            f', "ProfileIMGURL": "{user[3]}"}}'

                    userJSON = json.loads(jsstr)
                    result.append(userJSON)

        cursor.close()
        return result

    def insert(self, user_id, payload):
        """
        Adding a user to the bookmark list of a user
        :param user_id: the unique id of the user with the bookmark list
        :param payload: the dic of the user to be added
        :return: the added user
        """
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT BookmarklistID FROM bookmarklist WHERE UserID = {user_id}')

        bookmarklist_id = cursor.fetchall()[0][0]
        bookmarked_user_id = int(payload.get('UserID'))

        cursor.execute(
            f'INSERT INTO bookmark (BookmarklistID, BookmarkedUserID) VALUES ({bookmarklist_id}, {bookmarked_user_id})')

        self._cnx.commit()
        cursor.close()

        return payload

    def update(self, bookmarklist):
        pass

    def delete(self, user_id, payload):
        """
        Removing a user from the bookmark list of a user
        :param user_id: the unique id of the user with the bookmark list
        :param payload: the dic of the user to be deleted
        :return: the removed user
        """
        cursor = self._cnx.cursor()

        cursor.execute(f'SELECT BookmarklistID FROM bookmarklist WHERE UserID = {user_id}')

        bookmarklist_id = cursor.fetchall()[0][0]
        bookmarked_user_id = int(payload.get('UserID'))

        cursor.execute(
            f'DELETE FROM bookmark WHERE BookmarklistID = {bookmarklist_id} AND BookmarkedUserID = {bookmarked_user_id}')

        self._cnx.commit()
        cursor.close()

        return payload

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass

#todo delete bookmarklist