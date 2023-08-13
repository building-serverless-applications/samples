# Machine Setup

In order to run these examples, you'll want to install the following software:

### [`https://docs.docker.com/engine/install](Docker):

  Docker provides a container runtime; a container is a bundle of software
  container all the dependencies needed to run an application.  Containers are
  the basic deployment tool for Knative and Kubernetes; other serverless
  solutions generally build a similar type of artifact internally even if they
  don't use containers as a public format.  There are other container runtimes
  you can use, but Docker tends to have a fairly good user experience and is a
  good place to start if you aren't familiar with containers and Kubernetes.

  In addition to being a container runtime, Docker provides tools for _building_
  containers.  While there are other good tools for building containers out
  there, we'll be using Docker's built-in tools because they are widely adopted
  and very flexible.

### [https://kind.sigs.k8s.io/](`kind`):

  Kind is a tool for running Kubernetes locally.  Its name stands for
  "Kubernetes in Docker", and it can set up and manage a Kubernetes cluster
  running on a local Docker instance.  This is a handy setup for testing, and
  also for trying things out when you don't need persistent data.

### [https://kubernetes.io/docs/tasks/tools/install-kubectl](`kubectl`):

  `kubectl` is the official Kubernetes command-line tool.  `kn-quickstart` uses
  `kubectl` to install Knative once the `kind` cluster is created.  You probably
  won't need to use `kubectl` directly, but it's possible to manage Knative
  resources using `kubectl` if you want.  Kubectl also makes it easier to manage
  Kubernetes resources by declaring them based on a resource manifest -- a YAML
  file which contains the definition of the resource.  By putting resource
  definitions into a file, it becomes easier to manage them over time -- you can
  check the resources into source control, compare them with what's running on
  the cluster, and re-apply the resources to a different cluster to move an
  application from development to production.

### [https://knative.dev/docs/getting-started/quickstart-install/](`kn` and `kn quickstart`):

  `kn` is the official Knative CLI.  We'll be using the CLI for most of the
  examples because Kubernetes resource definitions can get unwieldy, but it's
  important to note that there's no magic here -- you can mix `kn` and `kubectl`
  freely.  `kn` even supports writing Kubernetes resource definitions to file
  for use with `kubectl` later if needed.

## Customizing the code

In order to customize the code, you'll need to install the following packages:

### [https://nodejs.org/](NodeJS):

  If you want to follow along with the commands for building and testing the
  frontend, you'll need a copy of NodeJS to build and run React.  (We'll use the
  NodeJS command to download and run React and any other dependencies, so you
  don't need to install anything React-specific.)

### [https://www.python.org/downloads/](Python):

  If you want to run the API service or routing layer later, Python is used to
  implement both of these processes.  If you have Python downloaded, you should
  have what is needed to download the required libraries.
