from flask import request
from google.auth.transport import requests
import google.oauth2.id_token


def secured(function):
    """
    This decorator checks whether a user is allowed to call the respective interface or not.
    For this, the cookies are used to get the JWT token. This is now checked to see if it is valid.
    :param function: the function the decorator is applied to
    :return: the function that can now be accessed. If the user is unauthorized it returns "'The user is unauthorized', 401"
    """
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Getting the JWT token from the cookies
        id_token = request.headers.get('Token')

        if id_token:
            try:
                # Checking if the token is valid
                claims = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)

                if claims is not None:
                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return 'The user is unauthorized', 401
            except ValueError:
                return 'The user is unauthorized', 401

        return 'The user is unauthorized', 401

    return wrapper
