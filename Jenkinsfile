#!groovy
@Library('cwan-pipeline-lib') _

// See https://stash.arbfund.com/projects/BLD/repos/cwan-pipeline-lib/browse/nodeCi.md
// for information on how to customize the pipeline for node projects.
cwanNodePipeline([
    parallelTestAndBuildMap: [
        e2e: { sh "./node_modules/@northfork/basics/cypress.docker.sh" }
    ],
    version: 2,
    pactPublish: false,
    skipDependencyCheck: true
])