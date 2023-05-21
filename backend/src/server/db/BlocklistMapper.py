from src.server.db import Mapper
from src.server.bo import Blocklist

Blocklist = Blocklist.Blocklist


class BlocklistMapper(Mapper.Mapper):

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
        command = "SELECT * FROM blocklist WHERE UserID={}".format(id)
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

    def insert(self, user_id, blocklist):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(BlocklistID) AS maxid FROM blocklist")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            Blocklist.set_id(maxid[0] + 1)

        command = "INSERT INTO blocklist (UserID, BlocklistID) VALUES (%s, %s)"
        data = (user_id, Blocklist.get_id())    #TODO ist user_id richtig übergeben?
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return Blocklist

    def update(self, blocklist):
        cursor = self._cnx.cursor()

        command = "UPDATE blocklist SET BlocklistID=%s WHERE BlocklistID=%s"
        data = (Blocklist.get_id(), Blocklist.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, blocklist):
        cursor = self._cnx.cursor()

        command = "DELETE FROM blocklist WHERE BlocklistID={}".format(Blocklist.get_id()) #TODO ist Blocklist.get_id() richtig?
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass
