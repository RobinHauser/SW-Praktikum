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

        for (id) in tuples:
            bookmarklist = Bookmarklist()
            bookmarklist.set_id(id)
            result.append(bookmarklist)

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
