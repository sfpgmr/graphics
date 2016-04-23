del /q /s .\res\outmov\*.*
ffmpeg -i ./res/nc3370.flv -vcodec png -vf "crop=120:75:250+10*cos(t):150+10*sin(t)" -s 40x25 -r 20 -y "./res/outmov/%%04d.png"
rem ffmpeg -i ./res/nc3370.flv -vcodec png -vf crop=160:80:210:160+30*sin(t/2) -s 40x20 -r 20 -y "./res/outmov/%%04d.png"
node makeMovie
