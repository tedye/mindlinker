# -*- coding: utf-8 -*-
import models
from flask import current_app


class AccessCode(object):
	"""Wrap around mongodb document object for `AccessCode`."""
	def __init__(self, access_code=None, role=None, expiration=None):
		self.access_code = access_code
		self.role = role
		self.expiration = expiration

	@classmethod
	def from_access_code(cls, access_code):
		"""Query mongodb and construct AccessCode object from access_code given.
		"""
		try:
			ac_doc = models.AccessCode.objects.get(access_code=access_code)
		except:
			ac_doc = None
		if ac_doc:
			# In case we found this access_code in the db.
			ac = cls(
				access_code=ac_doc.access_code,
				role=ac_doc.role,
				expiration=ac_doc.expiration,
			)
			current_app.logger.debug('Loaded access code: %s.' % access_code)
			return ac
		else:
			current_app.logger.debug(
				'access code %s not found in db.' % access_code)
			return None
