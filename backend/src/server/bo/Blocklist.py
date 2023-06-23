from src.server.bo.BusinessObject import BusinessObject

class Blocklist(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__owner_id = 0
        self.__blocked_users = []


    def get_owner_id(self):
        return self.__owner_id

    def set_owner_id(self, owner_id):
        self.__owner_id = owner_id

    def get_blocked_users(self):
        return self.__blocked_users

    def set_blocked_users(self, *users):
        self.__blocked_users = [users]

    def __str__(self):
        return "Blocklist: {}, {}, {}".format(self._id, self.__owner_id, self.__blocked_users)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Blocklist()
        obj.set_id(dictionary["id"])
        obj.set_owner_id(dictionary["owner_id"])
        obj.set_blocked_users(dictionary["blocked_users"])
        return obj