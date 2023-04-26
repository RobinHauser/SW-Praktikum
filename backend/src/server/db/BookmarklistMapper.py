from server.bo import Bookmarklist
from server.db import Mapper


class BookmarklistMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM bookmarklist")
        tuples = cursor.fetchall()

        for (id, name, owner) in tuples:
            bookmarklist = Bookmarklist()
            bookmarklist.set_id(id)
            bookmarklist.set_name(name)
            bookmarklist.set_owner(owner)
            result.append(bookmarklist)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM bookmarklist WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, owner) = tuples[0]
            bookmarklist = Bookmarklist()
            bookmarklist.set_id(id)
            bookmarklist.set_name(name)
            bookmarklist.set_owner(owner)
            result = bookmarklist
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, bookmarklist):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM bookmarklist ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            bookmarklist.set_id(maxid[0] + 1)

        command = "INSERT INTO bookmarklist (id, owner) VALUES (%s,%s,%s)"
        data = (bookmarklist.get_id(), bookmarklist.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return bookmarklist

    def update(self, bookmarklist):
        cursor = self._cnx.cursor()

        command = "UPDATE bookmarklist SET owner=%s WHERE id=%s"
        data = (bookmarklist.get_owner(), bookmarklist.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, bookmarklist):
        cursor = self._cnx.cursor()

        command = "DELETE FROM bookmarklist WHERE id={}".format(bookmarklist.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

