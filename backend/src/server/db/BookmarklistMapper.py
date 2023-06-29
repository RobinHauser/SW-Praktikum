from src.server.db.Mapper import Mapper
from src.server.bo.User import User


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

        # Retrieve Bookmarklist by UserID
        command = "SELECT * FROM bookmarklist WHERE UserID={}".format(user_id)
        cursor.execute(command)
        bookmarklist_tuple = cursor.fetchone()

        if bookmarklist_tuple is not None:
            bookmarklist_id = bookmarklist_tuple[0]

            # Retrieve bookmarked users
            command2 = "SELECT * FROM bookmark WHERE BookmarklistID={}".format(bookmarklist_id)
            cursor.execute(command2)
            bookmarks = cursor.fetchall()

            if bookmarks is not None:
                user_ids = [bookmark[2] for bookmark in bookmarks]

                if len(user_ids) != 0:
                    # Retrieve user by UserID
                    command3 = "SELECT * FROM user WHERE UserID IN ({})".format(','.join(str(uid) for uid in user_ids))
                    cursor.execute(command3)
                    users = cursor.fetchall()

                    if len(users) != 0:
                        for user in users:
                            new_user = User()
                            new_user.set_user_id(user[0])
                            new_user.set_email(user[1])
                            new_user.set_displayname(user[2])
                            new_user.set_avatarurl(user[3])
                            result.append(new_user)

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, user_id, bookmarked_user):
        """
        Adding a user to the bookmark list of a user
        :param user_id: the unique id of the user with the bookmark list
        :param bookmarked_user: the dic of the user to be added
        :return: the added user
        """
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT BookmarklistID FROM bookmarklist WHERE UserID = {user_id}')

        bookmarklist_id = cursor.fetchall()[0][0]
        bookmarked_user_id = bookmarked_user.get_user_id()

        cursor.execute(
            f'INSERT INTO bookmark (BookmarklistID, BookmarkedUserID) VALUES ({bookmarklist_id}, {bookmarked_user_id})')

        self._cnx.commit()
        cursor.close()

        return bookmarked_user

    def update(self, bookmarklist):
        pass

    def delete(self, user_id, bookmarked_user):
        """
        Removing a user from the bookmark list of a user
        :param user_id: the unique id of the user with the bookmark list
        :param bookmarked_user: the dic of the user to be deleted
        :return: the removed user
        """
        cursor = self._cnx.cursor()

        cursor.execute(f'SELECT BookmarklistID FROM bookmarklist WHERE UserID = {user_id}')

        bookmarklist_id = cursor.fetchall()[0][0]
        bookmarked_user_id = bookmarked_user.get_user_id()

        cursor.execute(
            f'DELETE FROM bookmark WHERE BookmarklistID = {bookmarklist_id} AND BookmarkedUserID = {bookmarked_user_id}')

        self._cnx.commit()
        cursor.close()

        return bookmarked_user
