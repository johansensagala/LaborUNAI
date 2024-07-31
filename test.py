x = "kaamvjjfl"
n = 4
y = [""] * n

index = 0

for i in range(n):
    j = i
    while j < len(x):
        y[i] += x[j]
        if i == 0 or i == n - 1:
            j += 2 * (n - 1)
        else:
            j += 2 * (n - 1 - i)
            if j < len(x):
                y[i] += x[j]
                j += 2 * i

result = "".join(y)
print(result)
