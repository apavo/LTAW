from django.forms import ModelForm, ValidationError
from .models import purchase

class BikeForm(ModelForm):

	class Meta:
		model = purchase;
		fields= '__all__';

	def clean_category(self):
		dicc_clean = self.cleaned_data
		category = dicc_clean.get('category')
		if (category != "bike" and category != "book" and category != "music"):
			raise ValidationError("Please fill category with book, bike or music")

		return category
