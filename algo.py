sw_lng, sw_lat, ne_lng, ne_lat = [
    72.51790346587711,
    22.963474141633426,
    72.64000972794906,
    23.10497381514483,
]


nw_lng = sw_lng
nw_lat = ne_lat
se_lng = ne_lng
se_lat = sw_lat

print(sw_lng, sw_lat, ne_lng, ne_lat)
print((sw_lng + ne_lng) / 2, (sw_lat + ne_lat) / 2)
