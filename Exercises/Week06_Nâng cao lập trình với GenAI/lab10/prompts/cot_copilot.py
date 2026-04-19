import numpy as np
from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route("/distances", methods=["POST"]) 
def calculate_distance(): 
    a, b, dist_type = parse_request_parameters(request) 
    dist_func = {"L1": get_manhattan_dist, "L2": get_euclidean_dist}.get(dist_type) 
    dist = dist_func(a, b) 
    return jsonify({"distance": dist}) 

# Các hàm dưới đây do Copilot tự động sinh ra dựa trên ngữ cảnh (context)
def parse_request_parameters(request): 
    data = request.get_json() 
    a = np.array(data["a"]) 
    b = np.array(data["b"]) 
    dist_type = data.get("dist_type", "L2") 
    return a, b, dist_type
 
 
def get_manhattan_dist(a, b): 
    dist = np.sum(np.abs(a - b)) 
    return dist
 
def get_euclidean_dist(a, b): 
    dist_2 = np.sum((a - b) ** 2) 
    return np.sqrt(dist_2)  
