from backend.src.server.db import Mapper


class ViewedMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_id(self, user_id):

        result = []
        cursor = self._cnx.cursor()

        #Get viewedList id of the user
        command = "SELECT ViewedListID FROM viewedlist WHERE UserID={}".format(user_id)
        cursor.execute(command)


        cursor.close()
        return result

    def insert(self, user_id, payload):
        pass

    def update(self, payload):
        pass

    def delete(self, user_id, payload):
        pass

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass
