from server.bo import Information
from server.db import Mapper


class InformationMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM information")
        tuples = cursor.fetchall()

        for (id, name, type) in tuples:
            information = Information()
            information.set_id(id)
            information.set_name(name)
            information.set_type(type)
            result.append(information)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM information WHERE InformationID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, type) = tuples[0]
            information = Information()
            information.set_id(id)
            information.set_name(name)
            information.set_type(type)
            result = information
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, information):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(InformationID) AS maxid FROM information ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            information.set_id(maxid[0] + 1)

        command = "INSERT INTO information (informationid) VALUES (%s)"
        data = (information.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def update(self, information):
        cursor = self._cnx.cursor()

        command = "UPDATE information SET InformationID=%s WHERE InformationID=%s"
        data = (information.get_name(), information.get_type(), information.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, information):
        cursor = self._cnx.cursor()

        command = "DELETE FROM information WHERE InformationID={}".format(information.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_name(self, name):
        pass

    def find_by_email(self, email):
        pass
