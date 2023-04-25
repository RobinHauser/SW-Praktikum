from server.db import Mapper


class BlocklistMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM blocklist")
        tuples = cursor.fetchall()

        for () in tuples:


        self._cnx.commit()
        cursor.close()

        return result
