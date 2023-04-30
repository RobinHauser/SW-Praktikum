from BusinessObject import BusinessObject

class Blocklist(BusinessObject):
    blocklist_counter = 3000 # evtl den aktuellen Wert bei deployment immer aus der datenbank holen ?
    def __init__(self):
        #super().__init__(id)
        Blocklist.blocklist_counter+=1
        self.__blocklist_id = Blocklist.blocklist_counter
        self.__owner_id = 0
        self.__blocked_users = []

    def get_blocklist_id(self):
        return self.__blocklist_id

    def set_blocklist_id(self, blocklist_id):
        self.__blocklist_id = blocklist_id

    def get_owner_id(self):
        return self.__owner_id

    def set_owner_id(self, owner_id):
        self.__owner_id = owner_id

    def get_blocked_users(self):
        return self.__blocked_users

    def set_blocked_users(self, *users):
        self.__blocked_users = [users]

    def __str__(self):
        return "Blocklist: {}, {}, {}".format(self.__blocklist_id, self.__owner_id, self.__blocked_users)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Blocklist()
        obj.set_blocklist_id(dictionary["blocklist_id"])
        obj.set_owner_id(dictionary["owner_id"])
        obj.set_blocked_users(dictionary["blocked_users"])
        return obj