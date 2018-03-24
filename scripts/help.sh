#!/bin/sh

set -eu

printf "############# PeerTube help #############\n\n"
printf "npm run ...\n"
printf "  build                       -> Build the application for production (alias of build:client:prod)\n"
printf "  build:server                -> Build the server for production\n"
printf "  build:client                -> Build the client for production\n"
printf "  clean:client                -> Clean the client build files (dist directory)\n"
printf "  clean:server:test           -> Clean logs, uploads, database... of the test instances\n"
printf "  watch:client                -> Watch and compile on the fly the client files\n"
printf "  danger:clean:dev            -> /!\ Clean certificates, logs, uploads, thumbnails, torrents and database specified in the development environment\n"
printf "  danger:clean:prod           -> /!\ Clean certificates, logs, uploads, thumbnails, torrents and database specified by the production environment\n"
printf "  danger:clean:modules        -> /!\ Clean node and typescript modules\n"
printf "  play                        -> Run 3 fresh nodes so that you can test the communication between them\n"
printf "  reset-password -- -u [user] -> Reset the password of user [user]\n"
printf "  dev                         -> Watch, run the livereload and run the server so that you can develop the application\n"
printf "  start                       -> Run the server\n"
printf "  update-host                 -> Upgrade scheme/host in torrent files according to the webserver configuration (config/ folder)\n"
printf "  client-report               -> Open a report of the client dependencies module\n"
printf "  test                        -> Run the tests\n"
printf "  help                        -> Print this help\n"
