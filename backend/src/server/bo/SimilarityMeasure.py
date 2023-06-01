class SimilarityMeasure:
    def __init__(self, profile1, profile2):
        """initialize a new instance of SimilarityMeasure to compare two Profiles"""
        self.__profile1 = profile1
        self.__profile2 = profile2

    def __get_smoker_sim(self):
        """Get the similarity of two users in terms of smoking

        compare if two users have the same smoking habit.
        If this is the case return 1 as similarity.
        If one of the users smokes when he's drunk and the other either smokes or doesn't smoke,
        return 0.5 as the similarity.
        If one user smokes and the other doesn't return 0 as similarity.
        """
        smoker1 = self.__profile1["smoker"]
        smoker2 = self.__profile2["smoker"]

        if smoker1 == smoker2:
            return 1
        elif smoker1 == "only when drunk" or smoker2 == "only when drunk":
            return 0.5
        else:
            return 0

    def __get_religion_sim(self):
        """Get the similarity of two users in terms of religion

        compare if two users have the same religion.
        If this is the case return 1 as similarity.
        If this is not the case return 0
        """
        if self.__profile1["religion"] == self.__profile2["religion"]:
            return 1
        else:
            return 0

    def __get_height_sim(self):
        """Get the weighted similarity between two ages

        Calculate the absolute amount of the difference of the two given heights.
        Check if the difference is greater than 20 and replace it by 20 if necessary to avoid that the similarity value
        drops below 0.
        Finally, calculate the weighted deviation by dividing the result by 20 and subtracting it from 1 to convert the
        deviation into the similarity.
        """
        height1 = self.__profile1["height"]
        height2 = self.__profile2["height"]

        # Absolute value of the difference
        result = abs(height1 - height2)

        # If the result is greater than 20, set it to 20 to obtain a maximum final return value of 1
        result = min(result, 20)

        # calculate the weighted deviation by dividing the result by 20
        # Subtract the weighted deviation from 1 to convert the deviation into the similarity
        return 1 - result / 20

    def __get_age_sim(self):
        """Get the weighted similarity between two ages

        Calculate the absolute amount of the difference of the two given ages.
        Check if the difference is greater than 5 and replace it by 5 if necessary to avoid that the similarity value
        drops below 0.
        Finally, calculate the weighted deviation by dividing the result by 5 and subtracting it from 1 to convert the
        deviation into the similarity.
        """
        age1 = self.__profile1["age"]
        age2 = self.__profile2["age"]

        # Absolute value of the difference
        result = abs(age1 - age2)

        # If the result is greater than 5, set it to 5 to obtain a maximum final return value of 1
        result = min(result, 5)

        # calculate the weighted deviation by dividing the result by 5
        # Subtract the weighted deviation from 1 to convert the deviation into the similarity
        return 1 - result / 5

    def __get_sunday_morning_sim(self):
        """Get the similarity between two descriptions of sunday morning

        The descriptions of the 2 profiles are split in the lowercase words of the two phrases.
        After that the words of one phrase are checked on similarity with the words of the other phrase.
        Finally, the similar word count is divided threw the length of the shorter word list of phrases to get the
        similarity of the two phrases.
        """
        s1 = self.__profile1["sunday morning"].lower().split(" ")
        s2 = self.__profile2["sunday morning"].lower().split(" ")
        similar_words = 0

        # check for similaritys in the two lists
        for word in s1:
            if word in s2:
                similar_words += 1

        # calculate and return the similarity of the two phrases
        return similar_words / min(len(s1), len(s2))

    def get_similarity_measure(self):
        """Get the similarity measure of two users

        First calculate the similarity of every single Property between the Users and save it in list_diff.
        Then calculate the mean value of all Propertys to get the similarity measure
        """
        list_diff = []

        # calculate the similarity of every Property between the Users and append it to list_diff
        if self.__profile1["smoker"] != "Keine Angabe" and self.__profile2["smoker"] != "Keine Angabe":
            list_diff.append(self.__get_smoker_sim())

        if self.__profile1["religion"] != "Keine Angabe" and self.__profile2["religion"] != "Keine Angabe":
            list_diff.append(self.__get_religion_sim())

        if self.__profile1["height"] != "Keine Angabe" and self.__profile2["height"] != "Keine Angabe":
            list_diff.append(self.__get_height_sim())

        if self.__profile1["age"] != "Keine Angabe" and self.__profile2["age"] != "Keine Angabe":
            list_diff.append(self.__get_age_sim())

        if self.__profile1["sunday morning"] != "Keine Angabe" \
                and self.__profile2["sunday morning"] != "Keine Angabe":
            list_diff.append(self.__get_sunday_morning_sim())

        # print(list_diff)

        # If one User didn't set any Properties return 0 as similarity between the Users
        if len(list_diff) == 0:
            return 0

        # calculate the mean value of the similarity measure of every Property
        similarity_measure = sum(list_diff) / len(list_diff)
        return similarity_measure


test_profile1 = {
    "smoker": "yes",
    "height": 187,
    "age": 20,
    "religion": "ev",
    "sunday morning": "wenn ich mit einem Kaffee geweckt werden :)"
}
test_profile2 = {
    "smoker": "no",
    "height": 175,
    "age": 18,
    "religion": "ev",
    "sunday morning": "mit einem Kaffee aufzuwachen"
}
test_profile3 = {
    "smoker": "yes",
    "height": 187,
    "age": 20,
    "religion": "ev",
    "sunday morning": "wenn ich mit einem Kaffee geweckt werden :)"
}

test = SimilarityMeasure(test_profile1, test_profile2)
print(f"Ähnlichkeitsmaß: {test.get_similarity_measure()}")
