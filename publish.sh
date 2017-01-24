rm index.zip
cd lambda
zip "../index.zip" -X -r *
cd ..
aws lambda update-function-code --function-name alexa-lisa --zip-file fileb://index.zip