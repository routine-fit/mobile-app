echo "Variant founded : " $1
echo "Replacing google files..."

if [ $1 = "com.routinefit" ]; then
    echo "Setting prod env"
    cp -r mobile/GoogleServices/GoogleService-InfoProd.plist GoogleService-Info.plist
else
    echo "Setting dev by default"
    cp -r mobile/GoogleServices/GoogleService-InfoDev.plist GoogleService-Info.plist
fi

echo "Replacing google files finished."
