DOCKER_IMAGE_NAME="alpine"

DOCKER_CONTAINERS=$(docker ps --filter "ancestor=$DOCKER_IMAGE_NAME" --format '{{.Names}} {{.Ports}}')

ARRAY=($DOCKER_CONTAINERS)

for ((i = 0; i < ${#ARRAY[@]}; i += 3));
do
  ARRAY[i+1]=$(echo ${ARRAY[i+1]} | cut -d":" -f2 | cut -d"-" -f1)
  ARRAY[i+2]=$(echo ${ARRAY[i+2]} | cut -d":" -f2 | cut -d"-" -f1)
done

RESULT="["
for ((i = 0; i < ${#ARRAY[@]}; i += 3));
do
  RESULT+="{"
  RESULT+="name:\"${ARRAY[i]}\","
  RESULT+="serverPort:${ARRAY[i+1]},"
  RESULT+="clientPort:${ARRAY[i+2]}"
  RESULT+="},"
done
RESULT+="]"

echo $RESULT
