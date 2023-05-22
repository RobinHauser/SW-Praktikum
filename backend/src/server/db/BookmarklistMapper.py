import json

from server.bo.User import User
from server.bo.Bookmarklist import Bookmarklist
from server.db.Mapper import Mapper


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

    def find_by_id(self, id):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM bookmarklist WHERE UserID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        v1 = tuples[0]
        v3 = v1[0]
        command2 = "SELECT * FROM bookmark WHERE BookmarklistID={}".format(v3)
        cursor.execute(command2)
        tuples2 = cursor.fetchall()

        v2 = tuples2[0]
        v4 = v2[2]
        command3 = "SELECT * FROM user WHERE UserID={}".format(v4)
        cursor.execute(command3)
        tuples3 = cursor.fetchall()


        try:
            (id, email, firstname, lastname) = tuples3[0]
            bookmarklist = User()
            bookmarklist.set_email(email)
            bookmarklist.set_firstname(firstname)
            bookmarklist.set_lastname(lastname)
            result.append(bookmarklist)
        except IndexError:
            result = None

        self._cnx.commit()
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
