from src.server.bo.BusinessObject import BusinessObject

class Profile(BusinessObject):
    def __init__(self):
        super().__init__("Profile", [4001, 5000])
        self.assigned_infos = []

        # todo personal profile bool

