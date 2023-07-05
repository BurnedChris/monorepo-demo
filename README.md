problems 

[ ] - dashboard.dockerfile seems to have an issue around hositing and yarn 3 

[ ] - yarn 3 needs to be avaliable at the end of the container so that we can run a zx script that uses `yarn dlx snaplet` or if the hoisting is correct we should be able to just call snaplet but that depends on the turbo repo prune


files in question
[dashboard.dockerfile](https://github.com/BurnedChris/monorepo-demo/blob/main/dashboard.dockerfile)
[dashboard/package.json](https://github.com/BurnedChris/monorepo-demo/blob/main/services/dashboard/package.json)
