from django.http import JsonResponse
from django.shortcuts import render
from .models import ActorFeature  # Import your ActorFeature model

def UseCaseDiagram(request):
    # Ambil semua fitur unik dari model ActorFeature
    features = list(ActorFeature.objects.values_list('feature_name', flat=True).distinct())
    print("Features available:", features)  # Debugging log
    
    context = {
        'features': features,
        'nama': 'hello world',
    }
    
    # Cetak untuk memeriksa apakah 'context' memiliki data yang benar
    print("Context features:", context['features'])  # Debugging log
    
    return render(request, 'UseCaseDiagram.html', context)

def use_case_result(request):
    if request.method == 'POST':
        actor_data = []
        
        # Ekstrak data actor dan fitur dari form
        for key, value in request.POST.items():
            if 'actor' in key and value:
                actor_id = key.replace('actor', '')
                
                # Ambil semua fitur yang berhubungan dengan actor ini
                features = [
                    request.POST.get(f'feature{actor_id}_{i}') 
                    for i in range(1, 10)  # Sesuaikan jumlah maksimal fitur jika perlu
                    if request.POST.get(f'feature{actor_id}_{i}')
                ]
                
                for feature in features:
                    # Simpan data actor dan fitur ke dalam database
                    ActorFeature.objects.create(actor_name=value, feature_name=feature)
                    actor_data.append((value, feature))
        
        # Cetak untuk memastikan data actor_data diambil dengan benar
        print("Actor data to save:", actor_data)  # Debugging log

        # Cek apakah request adalah AJAX
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'status': 'success', 'message': 'Data berhasil disimpan!'})

        # Render template hasil jika ini adalah POST biasa
        context = {
            'actor_data': actor_data,
            'nama': 'hello world',
        }
        return render(request, 'use_case_result.html', context)
    
    # Jika request bukan POST
    return render(request, 'use_case_result.html', {'nama': 'hello world'})

def generate_use_case_diagram(request):
    # Ambil semua fitur unik dari database
    features = list(ActorFeature.objects.values_list('feature_name', flat=True).distinct())
    
    # Cetak untuk memastikan data features tersedia
    print("Features for use case diagram:", features)  # Debugging log
    
    return render(request, 'use_case_result.html', {'features': features})

def Specification(request):
    context = {
        'nama' : 'hello world',
    }
    return render(request, 'Specification.html', context)

def output_activity(request):
    return render(request, 'output-activity.html')

def input_class(request):
    return render(request, 'inputClass.html')
