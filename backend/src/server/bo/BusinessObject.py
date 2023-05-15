from abc import ABC


class BusinessObject(ABC):
    id_ranges = {}
    def __init__(self, subclass, id_range):
        self._id = 0
        if subclass not in BusinessObject.id_ranges: #Wenn noch kein Objekt dieser Subklasse angelegt wurde
            BusinessObject.id_ranges[subclass] = id_range[0] #Subclass bekommt Untergrenze der range
        self._id = BusinessObject.id_ranges[subclass] #Untergrenze wird der id zugewiesen
        BusinessObject.id_ranges[subclass] += 1 #Untergrenze wird erhöht
        if self._id >= id_range[1]: #wenn id größer als Obergrenze
            raise ValueError("Reached maximum entities. Initializing not possible.") #todo besseres exception handling

    def get_id(self):
        return self._id

    def set_id(self, value):
        self._id = value
