Fix for source map issue in Angular material 2

    cd ./node_modules/@angular2-material
    find . -type f -exec sed -i 's/\/\/# \S*jelbourn\/material2\S*/ /g' {} +

Another fix for Angular cli problems

    npm cache clean
    npm install -g angular-cli@1.0.0-beta.5
    ng new testproj
    cd testproj
    ng build
    ng build -prod