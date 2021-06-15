import matplotlib.pyplot as plot
from scipy.stats import pearsonr
import numpy as np
# from sklearn.linear_model import LinearRegression
f1 = open('tqqq.txt')
tqqq = f1.read()
tqqq = np.asarray(tqqq.split(','), dtype=np.float64, order='C')

f2 = open('uvxy.txt')
uvxy = f2.read()
uvxy = np.asarray(uvxy.split(','), dtype=np.float64, order='C')

corr, _ = pearsonr(tqqq, uvxy)
print('Pearsons correlation: %.3f' % corr)
time_list = list(range(0, uvxy.size))
plot.plot(time_list, tqqq, label = 'tqqq')
# plot.plot(time_list, qqq, label = 'qqq')
plot.plot(time_list, uvxy, label = 'uvxy')
plot.legend(loc="upper left")

plot.show()