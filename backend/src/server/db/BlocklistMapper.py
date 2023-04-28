from server.db import Mapper
from server.bo import Blocklist


class BlocklistMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM blocklist")
        tuples = cursor.fetchall()

        for (id) in tuples:
            blocklist = Blocklist()
            blocklist.set_id(id)
            result.append(blocklist)


        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM blocklist WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id) = tuples[0]
            blocklist = Blocklist()
            blocklist.set_id(id)
            result = blocklist
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, Blocklist):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM blocklist ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            Blocklist.set_blocklist_id(maxid[0] + 1)

        command = "INSERT INTO blocklist (id) VALUES (%s)"
        data = (Blocklist.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return Blocklist

    def update(self, Blocklist):
        cursor = self._cnx.cursor()

        command = "UPDATE blocklist SET id=%s WHERE id=%s"
        data = (Blocklist.get_id(), Blocklist.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, Blocklist):
        cursor = self._cnx.cursor()

        command = "DELETE FROM blocklist WHERE id={}".format(Blocklist.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()



