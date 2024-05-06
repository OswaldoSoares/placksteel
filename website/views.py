from django.shortcuts import render


# Create your views here.
def index_website(request):
    context = {}
    context.update()
    return render(request, "website/index.html", context)
