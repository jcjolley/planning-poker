# Northfork Angular Starter Template

Northfork is a set of libraries to help rapidly create new applications.

## Package Manager

We recommend using [yarn](https://classic.yarnpkg.com/en/) as your package
manager. Please install
[yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable). Once
installed, you can use the `yarn` command to install all the packages.

We have already included yarn-1.22.4 to the project to ensure all developers are
using the same version, but you must install yarn 1 to have the runtime. See
[yarn policies](https://classic.yarnpkg.com/en/docs/cli/policies/) for more
information.

## Initial Clone of project

After cloning the project, run the `init-repo.sh` script. This script sets up the
Clearwater repository, a custom set of githooks for pre-pending jira tickets
based on branch names, and triggering an install for the packages.

_This script is designed to run in git-bash or a similar shell_

```shell
sh init-repo.sh
```

### [Northfork Documentation](https://northfork.arbfund.com/)

## Getting Started

1. Pick which Environment Configuration to use. The seed projects ships with the
   mock-config.

   - **[@im/ng-config](https://stash.arbfund.com/projects/AMPUI/repos/northfork/browse/packages/im-ng-config)**:
     Configuration for use in the IM Portal
   - **[@northfork/mock-config](https://stash.arbfund.com/projects/AMPUI/repos/northfork/browse/packages/mock-ng-config)**:
     Configuration that sets defaults that are good for starting out or for
     test.
   - **Custom configs**: You can create custom configurations if you need. The
     [@northfork/mock-config](https://stash.arbfund.com/projects/AMPUI/repos/northfork/browse/packages/mock-ng-config)
     is a great starting place to know what to implement.

1. **Ag-Grid** - [Ag-Grid](https://www.ag-grid.com/) is a table library we use
   to create all the tables. It has an enterprise licence and Clearwater has
   purchased a limited number of seats. **please contact the
   [@Northfork](https://teams.microsoft.com/l/channel/19%3a91ef1f89759140a290a7dc3289d80fd1%40thread.skype/Public%2520Support?groupId=49ed28ac-86b4-4c65-844f-9f5ed08fa42f&tenantId=3dd59dce-9563-4ed5-b9aa-d0320fb1b440)
   team on Microsoft teams** before you use ag-grid. Also read the readme on our
   ag-grid library
   [@northfork/ag-grid](https://stash.arbfund.com/projects/NFORK/repos/northfork/browse/packages/ag-grid/README.md).
   We will make sure we are compliant with our licence and put your project on
   the list.

1. Talk with the UX Designer about creating mockups and reviewing the
   application.

1. Setup sonar to give you real-time warnings and errors. See the Clearwater
   [VS Code](https://confluence.arbfund.com/display/DEV/2020/05/18/Installing+and+Using+the+Visual+Studio+Code+SonarLint+Extension+with+SonarQube+Enterprise)
   or
   [Intellij](https://confluence.arbfund.com/display/DEV/2020/05/13/Installing+and+Using+the+IntelliJ+SonarLint+Plugin+with+SonarQube+Enterprise)
   blog posts for how to configure this.

1. Update this readme with information About your application.

## Pact Testing
- This project has been configured as the consumer for a pact with `example-ws`.
- Contract generation will occur during karma tests (`npm test`). This is configured in `karma.conf.js`, where a `pactWithProxies` is defined for the pact plugin.  Contract(s) will be written to the `pacts/` folder (created on first run.)
- The contract will be pushed to the pactbroker on a successful build (turned on with the `pactPublish` flag in `Jenkinsfile`).  
- The folder `src/app/services` contains a client for `example-ws`, along with a simple pact spec for it.

## Northfork Contacts

- Email -
  [Northfork_dist@clearwateranalytics.com](mailto:Northfork_dist@clearwateranalytics.com)
- [Microsoft Teams](https://teams.microsoft.com/l/channel/19%3a91ef1f89759140a290a7dc3289d80fd1%40thread.skype/Public%2520Support?groupId=49ed28ac-86b4-4c65-844f-9f5ed08fa42f&tenantId=3dd59dce-9563-4ed5-b9aa-d0320fb1b440)
