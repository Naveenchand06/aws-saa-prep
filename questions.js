// AWS Solutions Architect Associate (SAA-C03) practice question bank.
// To add questions, append objects to this array following the same shape:
//   domain  - one of the four SAA-C03 exam domains (used for the results breakdown)
//   pick    - how many options must be selected (1 = radio, 2+ = checkboxes)
//   options - each option has `text`, `correct`, and a one-liner `why`
const QUESTION_BANK = [
  // ---------- Domain 1: Design Secure Architectures ----------
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An application running on EC2 instances needs to read objects from an S3 bucket. What is the MOST secure way to grant this access?",
    options: [
      { text: "Create an IAM user, generate access keys, and store them in a config file on the instance.", correct: false, why: "Long-lived access keys on an instance can leak and must be rotated manually." },
      { text: "Attach an IAM role with an S3 read policy to the EC2 instances via an instance profile.", correct: true, why: "Roles deliver temporary, auto-rotated credentials through the instance metadata service — no stored secrets." },
      { text: "Make the S3 bucket public but restrict access with a firewall on the instances.", correct: false, why: "A public bucket exposes data to the entire internet; an instance firewall does nothing to protect it." },
      { text: "Embed the root account access keys in the application code.", correct: false, why: "Root credentials should never be used programmatically, let alone hardcoded." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A company must encrypt data at rest in S3 and needs an audit trail of every time the encryption key is used. Which solution meets this requirement?",
    options: [
      { text: "SSE-S3 (Amazon S3 managed keys)", correct: false, why: "SSE-S3 keys are fully managed by S3 and key usage is not individually auditable in CloudTrail." },
      { text: "SSE-KMS with a customer managed key", correct: true, why: "Every use of a KMS customer managed key is logged in CloudTrail, giving a full audit trail." },
      { text: "Client-side encryption with keys in a text file", correct: false, why: "Keys in a file provide no managed audit trail and are easy to mishandle." },
      { text: "SSE-C (customer-provided keys)", correct: false, why: "With SSE-C you must supply and track the key on every request yourself — AWS keeps no key-usage audit log." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "Which statement about security groups and network ACLs is correct?",
    options: [
      { text: "Security groups are stateful; network ACLs are stateless.", correct: true, why: "Return traffic is automatically allowed by security groups, while NACLs require explicit inbound and outbound rules." },
      { text: "Security groups are stateless; network ACLs are stateful.", correct: false, why: "It is the reverse — security groups track connection state, NACLs do not." },
      { text: "Both are stateful.", correct: false, why: "NACLs are stateless; return traffic must be explicitly allowed." },
      { text: "Security groups support explicit deny rules.", correct: false, why: "Security groups only have allow rules; explicit deny is a NACL feature." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "Developers in Account A need temporary access to resources in Account B. What is the recommended approach?",
    options: [
      { text: "Create IAM users in Account B and share the passwords.", correct: false, why: "Duplicated users and shared passwords are hard to audit and violate least privilege." },
      { text: "Create a cross-account IAM role in Account B and let Account A users assume it via STS.", correct: true, why: "AssumeRole issues short-lived credentials and keeps a clean, auditable trust boundary between accounts." },
      { text: "Copy Account B's root access keys to Account A.", correct: false, why: "Sharing root credentials is the single worst practice in AWS security." },
      { text: "Open all security groups in Account B to Account A's IP range.", correct: false, why: "Security groups control network traffic, not IAM authorization to AWS resources." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An application uses a database password that must be rotated automatically every 30 days. Which service should be used?",
    options: [
      { text: "AWS Secrets Manager", correct: true, why: "Secrets Manager natively supports scheduled automatic rotation, including built-in Lambda rotation for RDS." },
      { text: "SSM Parameter Store (Standard tier)", correct: false, why: "Parameter Store stores secrets but has no built-in automatic rotation." },
      { text: "S3 bucket with SSE-KMS", correct: false, why: "S3 is object storage, not a secrets lifecycle manager." },
      { text: "IAM policy variables", correct: false, why: "IAM policy variables are for policy conditions, not storing or rotating credentials." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A static website in S3 is served through CloudFront. How do you ensure users can ONLY access content via CloudFront, not directly from S3?",
    options: [
      { text: "Use Origin Access Control (OAC) and a bucket policy that only allows the CloudFront distribution.", correct: true, why: "OAC lets CloudFront sign origin requests so the bucket policy can reject any direct S3 access." },
      { text: "Enable S3 Transfer Acceleration.", correct: false, why: "Transfer Acceleration speeds up uploads over long distances; it has nothing to do with access control." },
      { text: "Make the bucket public and rely on CloudFront caching.", correct: false, why: "A public bucket remains directly reachable regardless of CloudFront." },
      { text: "Attach a security group to the S3 bucket.", correct: false, why: "S3 is not in a VPC — you cannot attach security groups to buckets." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A web application behind an Application Load Balancer is being hit with SQL-injection attempts. Which service blocks these at the edge with the LEAST application change?",
    options: [
      { text: "AWS WAF with managed SQL-injection rules attached to the ALB.", correct: true, why: "WAF inspects HTTP requests and its managed rule groups block SQLi patterns with zero code changes." },
      { text: "AWS Shield Standard.", correct: false, why: "Shield protects against DDoS attacks, not application-layer injection attacks." },
      { text: "Amazon GuardDuty.", correct: false, why: "GuardDuty detects threats from logs; it does not block requests inline." },
      { text: "Rewrite the application input validation.", correct: false, why: "Effective, but it is the opposite of 'least application change'." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "EC2 instances in private subnets must access S3 without traffic traversing the internet. What should the architect configure?",
    options: [
      { text: "A NAT gateway in a public subnet.", correct: false, why: "A NAT gateway routes traffic out through the internet, which the requirement forbids (and adds cost)." },
      { text: "A gateway VPC endpoint for S3.", correct: true, why: "Gateway endpoints route S3 traffic over the AWS private network — no internet path and no data-processing charge." },
      { text: "An internet gateway with restrictive security groups.", correct: false, why: "An internet gateway is by definition an internet path." },
      { text: "AWS Direct Connect.", correct: false, why: "Direct Connect links on-premises networks to AWS; it is irrelevant for VPC-to-S3 traffic." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 2,
    question:
      "A company wants to enforce MFA and centrally manage access across many AWS accounts in an organization. Which TWO services best support this?",
    options: [
      { text: "AWS IAM Identity Center (successor to AWS SSO)", correct: true, why: "Identity Center gives centralized, MFA-enforced workforce access across all organization accounts." },
      { text: "AWS Organizations with Service Control Policies", correct: true, why: "SCPs set organization-wide permission guardrails (e.g., deny actions without MFA)." },
      { text: "Amazon Cognito user pools", correct: false, why: "Cognito handles customer-facing application sign-in, not workforce access to AWS accounts." },
      { text: "AWS Config", correct: false, why: "Config records resource compliance; it does not manage access." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A mobile app needs to let users sign up, sign in (including via Google/Facebook), and then access AWS resources with temporary credentials. Which service combination fits?",
    options: [
      { text: "Amazon Cognito user pools for auth and identity pools for temporary AWS credentials.", correct: true, why: "User pools handle sign-up/sign-in with social federation; identity pools exchange tokens for scoped temporary AWS credentials." },
      { text: "IAM users created per app user.", correct: false, why: "Creating an IAM user per end customer does not scale and IAM has a 5,000-user quota." },
      { text: "AWS Directory Service.", correct: false, why: "Directory Service is for Active Directory workloads, not consumer mobile sign-in." },
      { text: "Amazon Inspector.", correct: false, why: "Inspector is a vulnerability scanner and has nothing to do with authentication." },
    ],
  },

  // ---------- Domain 2: Design Resilient Architectures ----------
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A production MySQL database on RDS must survive an Availability Zone failure with automatic failover and no manual intervention. What should you enable?",
    options: [
      { text: "Multi-AZ deployment", correct: true, why: "Multi-AZ keeps a synchronous standby in another AZ and fails over automatically, usually within a minute or two." },
      { text: "A read replica in the same AZ", correct: false, why: "Same-AZ replicas die with the AZ, and replica promotion is a manual step anyway." },
      { text: "Automated daily snapshots", correct: false, why: "Snapshots let you restore eventually, but restoring is manual and loses data since the last snapshot." },
      { text: "An ElastiCache cluster in front of RDS", correct: false, why: "A cache improves read performance; it does not provide database failover." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A stateless web application must remain available even if an entire Availability Zone fails, while scaling with demand. Which architecture achieves this?",
    options: [
      { text: "An Auto Scaling group spanning multiple AZs behind an Application Load Balancer.", correct: true, why: "The ALB spreads traffic across AZs and the ASG replaces capacity automatically when an AZ is lost." },
      { text: "One large EC2 instance with detailed monitoring.", correct: false, why: "A single instance is a single point of failure no matter how well you monitor it." },
      { text: "Two EC2 instances in the same AZ behind an ALB.", correct: false, why: "Everything in one AZ still goes down together when that AZ fails." },
      { text: "An Auto Scaling group in one AZ with scheduled scaling.", correct: false, why: "Scheduled scaling handles predictable load, not AZ failure — a single AZ remains the weak point." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A company runs its primary site in us-east-1 and a standby copy in eu-west-1. Route 53 should send all traffic to the primary and switch to the standby only when the primary is unhealthy. Which routing policy is required?",
    options: [
      { text: "Failover routing with health checks", correct: true, why: "Failover routing is purpose-built for active-passive: it serves the secondary only when the primary health check fails." },
      { text: "Weighted routing 50/50", correct: false, why: "Weighted routing splits traffic between both sites all the time, which is active-active, not standby." },
      { text: "Geolocation routing", correct: false, why: "Geolocation routes by the user's location and does not react to endpoint health by design." },
      { text: "Simple routing with two records", correct: false, why: "Simple routing cannot use health checks, so traffic would keep flowing to the dead site." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "An order-processing service occasionally crashes and loses in-flight orders sent by the front end. How can the architecture be changed so orders are never lost?",
    options: [
      { text: "Put an SQS queue between the front end and the processing service.", correct: true, why: "SQS durably stores messages until a consumer successfully processes and deletes them, decoupling the two tiers." },
      { text: "Increase the processing instance size.", correct: false, why: "A bigger instance can still crash; in-flight requests are still lost." },
      { text: "Use SNS to fan out orders to the service.", correct: false, why: "Standard SNS is push-based fire-and-forget; if the subscriber is down retries eventually give up unless paired with a queue." },
      { text: "Enable EC2 auto-recovery.", correct: false, why: "Auto-recovery restarts the instance but anything held in memory at crash time is gone." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "Compliance requires that objects written to an S3 bucket in us-east-1 are automatically copied to a bucket in ap-southeast-2. What is the simplest solution?",
    options: [
      { text: "S3 Cross-Region Replication (CRR)", correct: true, why: "CRR replicates new objects to a destination bucket in another Region automatically once versioning is enabled." },
      { text: "A cron job running aws s3 sync every hour.", correct: false, why: "It works but is self-managed, adds up to an hour of data-loss window, and is not the simplest option." },
      { text: "S3 Transfer Acceleration", correct: false, why: "Transfer Acceleration speeds up client uploads to one bucket; it does not copy data between buckets." },
      { text: "AWS DataSync scheduled hourly", correct: false, why: "DataSync can do it, but CRR is native, continuous, and requires no scheduling." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "Hundreds of EC2 instances in multiple AZs need shared, concurrent access to the same POSIX file system. Which storage service fits?",
    options: [
      { text: "Amazon EFS", correct: true, why: "EFS is a managed NFS file system mountable from many instances across AZs simultaneously." },
      { text: "Amazon EBS with Multi-Attach", correct: false, why: "Multi-Attach is limited to io1/io2 volumes, a handful of instances, and a single AZ." },
      { text: "S3 mounted via third-party FUSE driver", correct: false, why: "S3 is object storage; FUSE mounts don't provide reliable POSIX semantics like locking." },
      { text: "EC2 instance store shared over SMB", correct: false, why: "Instance store is ephemeral and local to one instance — data disappears when the instance stops." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A globally used gaming app needs a DynamoDB table that is readable AND writable with low latency from multiple Regions. What should you use?",
    options: [
      { text: "DynamoDB global tables", correct: true, why: "Global tables provide multi-Region, multi-active replication with local read/write latency in every Region." },
      { text: "DynamoDB with DAX", correct: false, why: "DAX accelerates reads in one Region; it does not replicate the table across Regions." },
      { text: "A single-Region table with CloudFront in front", correct: false, why: "CloudFront caches HTTP content; it cannot serve DynamoDB writes from other Regions." },
      { text: "Nightly export/import between Regional tables", correct: false, why: "Batch copies mean stale data and no multi-Region writes." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "Instances in private subnets across three AZs reach the internet through a single NAT gateway in AZ-a. What is the resilience risk?",
    options: [
      { text: "If AZ-a fails, instances in all three AZs lose outbound internet access.", correct: true, why: "A NAT gateway is a zonal resource — best practice is one per AZ with per-AZ route tables." },
      { text: "NAT gateways cannot handle traffic from multiple AZs.", correct: false, why: "They can route cross-AZ traffic fine; the issue is availability, not capability." },
      { text: "There is no risk; NAT gateways are regional.", correct: false, why: "NAT gateways live in a specific AZ, unlike internet gateways which are regional." },
      { text: "Cross-AZ NAT traffic is blocked by default.", correct: false, why: "Nothing blocks it — you just pay cross-AZ data charges and accept the single-AZ dependency." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 2,
    question:
      "A company needs an RPO of 5 minutes and an RTO of 1 hour for its RDS PostgreSQL database in case of a Regional outage. Which TWO actions help meet these targets?",
    options: [
      { text: "Create a cross-Region read replica.", correct: true, why: "Asynchronous cross-Region replication keeps data loss to seconds-to-minutes and the replica can be promoted quickly." },
      { text: "Automate replica promotion and DNS failover with a tested runbook.", correct: true, why: "RTO is only met if promotion and cutover are rehearsed and scripted, not improvised." },
      { text: "Rely on automated daily snapshots copied cross-Region.", correct: false, why: "A daily snapshot means up to 24 hours of data loss — far worse than a 5-minute RPO." },
      { text: "Enable Multi-AZ only.", correct: false, why: "Multi-AZ protects against AZ failure within one Region, not a Regional outage." },
    ],
  },

  // ---------- Domain 3: Design High-Performing Architectures ----------
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A read-heavy web app repeatedly queries the same product catalog data from RDS, causing high database load. What is the BEST way to reduce the load?",
    options: [
      { text: "Add an ElastiCache (Redis) layer to cache frequent reads.", correct: true, why: "Caching hot, repetitive reads in memory offloads the database and returns results in microseconds." },
      { text: "Upgrade to a larger RDS instance class.", correct: false, why: "Vertical scaling buys headroom but is costlier and doesn't address the repetitive-read pattern." },
      { text: "Convert the database to DynamoDB.", correct: false, why: "A migration is a huge change and repetitive reads would still hit the datastore without a cache." },
      { text: "Enable RDS storage autoscaling.", correct: false, why: "Storage autoscaling grows disk space; it does nothing for query load." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "Users worldwide upload large files to a single S3 bucket in us-east-1 and complain about slow uploads from distant locations. What is the simplest fix?",
    options: [
      { text: "Enable S3 Transfer Acceleration on the bucket.", correct: true, why: "Uploads enter the nearest CloudFront edge location and ride AWS's optimized backbone to the bucket." },
      { text: "Ask users to upload during off-peak hours.", correct: false, why: "The bottleneck is distance/latency, not time-of-day congestion on AWS's side." },
      { text: "Create buckets in every Region and merge nightly.", correct: false, why: "This adds heavy operational complexity compared to a single checkbox feature." },
      { text: "Use EC2 as an upload proxy in each Region.", correct: false, why: "Self-managed proxies duplicate what Transfer Acceleration provides natively." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A media site serves the same images and videos to millions of global users from S3. Latency and S3 request costs are both concerns. What should be added?",
    options: [
      { text: "Amazon CloudFront distribution with the S3 bucket as origin.", correct: true, why: "Edge caching serves content near users, cutting latency and slashing repeated S3 GET requests." },
      { text: "S3 Intelligent-Tiering.", correct: false, why: "Intelligent-Tiering optimizes storage cost per object; it doesn't reduce latency or request count." },
      { text: "AWS Global Accelerator.", correct: false, why: "Global Accelerator optimizes routing to regional endpoints but does not cache content." },
      { text: "Larger multipart chunk sizes.", correct: false, why: "Chunk size tuning helps big single transfers, not millions of repeated downloads." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A database on EC2 needs 64,000 IOPS on a single EBS volume with sub-millisecond latency. Which volume type is required?",
    options: [
      { text: "io2 Block Express (Provisioned IOPS SSD)", correct: true, why: "io2 Block Express scales to 256,000 IOPS per volume with consistent sub-millisecond latency." },
      { text: "gp3 (General Purpose SSD)", correct: false, why: "gp3 caps at 16,000 IOPS per volume — well short of 64,000." },
      { text: "st1 (Throughput Optimized HDD)", correct: false, why: "st1 is a spinning-disk tier for sequential throughput, not high IOPS." },
      { text: "sc1 (Cold HDD)", correct: false, why: "sc1 is the lowest-performance, lowest-cost HDD tier — the opposite of this requirement." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "Thousands of IoT sensors emit telemetry that must be ingested and processed in real time (sub-second) by multiple consumer applications. Which service is designed for this?",
    options: [
      { text: "Amazon Kinesis Data Streams", correct: true, why: "Kinesis ingests streaming data at scale and lets multiple consumers read the same records in real time." },
      { text: "Amazon SQS standard queue", correct: false, why: "Each SQS message is consumed by one consumer; it is a queue, not a fan-out replayable stream." },
      { text: "S3 with event notifications", correct: false, why: "S3 events work per uploaded object — batchy and higher latency than a stream." },
      { text: "AWS Batch", correct: false, why: "Batch schedules containerized batch jobs; it is not a real-time ingestion service." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A multiplayer game uses UDP and needs static IP addresses plus the lowest possible latency for global users reaching Regional endpoints. Which service fits?",
    options: [
      { text: "AWS Global Accelerator", correct: true, why: "Global Accelerator provides two static anycast IPs and routes TCP/UDP over the AWS backbone to the nearest healthy endpoint." },
      { text: "Amazon CloudFront", correct: false, why: "CloudFront is HTTP/HTTPS content delivery — it cannot proxy arbitrary UDP game traffic." },
      { text: "Route 53 latency-based routing", correct: false, why: "It picks a good Region at DNS time but offers no static IPs and traffic still rides the public internet." },
      { text: "An ALB with cross-zone load balancing", correct: false, why: "ALBs are HTTP-only and regional, with no static IPs." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "An RDS MySQL database is overwhelmed by read traffic from reporting dashboards, while writes are light. What is the most direct fix?",
    options: [
      { text: "Add RDS read replicas and point the dashboards at them.", correct: true, why: "Read replicas offload read-only traffic, isolating reports from the primary's write workload." },
      { text: "Enable Multi-AZ.", correct: false, why: "The Multi-AZ standby is invisible to applications and serves no read traffic." },
      { text: "Shard the database across multiple primaries.", correct: false, why: "Sharding is a major re-architecture aimed at write scaling, overkill for read-heavy reporting." },
      { text: "Move reports to run against nightly S3 exports only.", correct: false, why: "Possible, but it changes data freshness and the reporting stack rather than directly fixing read scale." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A tightly coupled HPC workload needs the lowest network latency and highest throughput between EC2 instances. Which placement strategy should be used?",
    options: [
      { text: "Cluster placement group", correct: true, why: "Cluster groups pack instances close together in one AZ for maximum per-flow throughput and lowest latency." },
      { text: "Spread placement group", correct: false, why: "Spread does the opposite — it separates instances onto distinct racks for fault isolation." },
      { text: "Partition placement group", correct: false, why: "Partition groups isolate groups of instances across racks, designed for big distributed systems like Hadoop." },
      { text: "Instances in different AZs for parallelism", correct: false, why: "Cross-AZ links add latency — exactly what HPC inter-node traffic must avoid." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A DynamoDB-backed application needs microsecond read latency for the same frequently read items, with minimal code changes. What should be used?",
    options: [
      { text: "DynamoDB Accelerator (DAX)", correct: true, why: "DAX is an API-compatible in-memory cache for DynamoDB delivering microsecond reads with near-zero code change." },
      { text: "ElastiCache Memcached with custom cache logic", correct: false, why: "It can work but requires writing and maintaining your own cache-aside code — not minimal change." },
      { text: "Increase provisioned RCUs", correct: false, why: "More RCUs add throughput, but DynamoDB reads stay at single-digit milliseconds, not microseconds." },
      { text: "DynamoDB global tables", correct: false, why: "Global tables address multi-Region access, not per-item read latency." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A company is migrating a Windows application that requires shared storage accessed via SMB with Active Directory integration. Which service should be used?",
    options: [
      { text: "Amazon FSx for Windows File Server", correct: true, why: "FSx for Windows is a fully managed SMB file system with native Active Directory integration." },
      { text: "Amazon EFS", correct: false, why: "EFS speaks NFS and targets Linux clients — no native SMB or AD support." },
      { text: "Amazon FSx for Lustre", correct: false, why: "Lustre is for high-performance computing scratch storage, not Windows SMB shares." },
      { text: "S3 with File Gateway", correct: false, why: "File Gateway is meant for on-premises access to S3, an awkward fit for a native cloud Windows app." },
    ],
  },

  // ---------- Domain 4: Design Cost-Optimized Architectures ----------
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Log files in S3 are read frequently for 30 days, rarely for the next 60 days, and must be kept for 7 years for compliance (retrieval time of hours is acceptable). What is the most cost-effective lifecycle?",
    options: [
      { text: "S3 Standard → S3 Standard-IA after 30 days → S3 Glacier Deep Archive after 90 days.", correct: true, why: "Each tier matches the access pattern, and Deep Archive is the cheapest storage for long-term compliance data." },
      { text: "Keep everything in S3 Standard for 7 years.", correct: false, why: "Standard is the most expensive tier — wasteful for data that's almost never read." },
      { text: "Move to Glacier Deep Archive immediately.", correct: false, why: "The first 30 days of frequent reads would incur slow, per-retrieval charges." },
      { text: "Store on EBS volumes attached to a logging instance.", correct: false, why: "EBS costs far more than S3 tiers and adds an instance to maintain." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A nightly batch job processes images for about 4 hours, is fault-tolerant, and can resume if interrupted. Which EC2 purchasing option minimizes cost?",
    options: [
      { text: "Spot Instances", correct: true, why: "Spot offers up to ~90% discount and is ideal for interruptible, resumable batch work." },
      { text: "On-Demand Instances", correct: false, why: "On-Demand is the flexible but full-price option — no discount for tolerance to interruption." },
      { text: "3-year Reserved Instances", correct: false, why: "Reserving capacity 24/7 for a 4-hour nightly job pays for idle time." },
      { text: "Dedicated Hosts", correct: false, why: "Dedicated Hosts are the most expensive option, meant for licensing/compliance needs." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A company has a steady baseline of compute usage but wants discount flexibility across instance families, sizes, and even Fargate/Lambda. What should they buy?",
    options: [
      { text: "Compute Savings Plans", correct: true, why: "Compute Savings Plans give up to 66% off any instance family, Region, Fargate, or Lambda for a $/hour commitment." },
      { text: "Standard Reserved Instances", correct: false, why: "Standard RIs lock you to an instance family and Region — no flexibility across families or Fargate." },
      { text: "Spot Instances", correct: false, why: "Spot can be reclaimed at any time, unsuitable as the discount plan for steady baseline workloads." },
      { text: "On-Demand Capacity Reservations", correct: false, why: "Capacity Reservations guarantee capacity but carry no discount at all." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Private-subnet EC2 instances download terabytes from S3 each month through a NAT gateway, driving up costs. What change cuts this cost the most?",
    options: [
      { text: "Add a gateway VPC endpoint for S3 and route S3 traffic through it.", correct: true, why: "Gateway endpoints are free — S3 traffic bypasses the NAT gateway's per-GB processing charges entirely." },
      { text: "Use a bigger NAT gateway.", correct: false, why: "NAT gateway pricing is per GB processed; size doesn't change the bill." },
      { text: "Replace the NAT gateway with a NAT instance.", correct: false, why: "It may trim costs slightly but adds management burden and still routes S3 traffic wastefully." },
      { text: "Compress objects in S3.", correct: false, why: "Helps a bit if data is compressible, but eliminating the NAT path saves the whole charge." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "An API endpoint receives unpredictable, spiky traffic — sometimes zero requests for hours, sometimes short bursts. Which compute choice is most cost-effective?",
    options: [
      { text: "AWS Lambda behind API Gateway", correct: true, why: "Lambda bills per request and per millisecond of execution — idle time costs exactly nothing." },
      { text: "An always-on EC2 instance", correct: false, why: "You pay 24/7 for capacity that sits idle most of the time." },
      { text: "An ECS cluster with two always-running tasks", correct: false, why: "Same idle-cost problem as EC2, plus cluster management." },
      { text: "A 1-year Reserved Instance", correct: false, why: "Committing to steady usage for a spiky, mostly idle workload maximizes waste." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Object access patterns in a data lake are unknown and change unpredictably. Which S3 storage class optimizes cost automatically without retrieval fees?",
    options: [
      { text: "S3 Intelligent-Tiering", correct: true, why: "Intelligent-Tiering moves objects between access tiers automatically based on usage, with no retrieval fees." },
      { text: "S3 Standard-IA", correct: false, why: "Standard-IA charges per-GB retrieval fees, which sting when 'infrequent' objects turn hot." },
      { text: "S3 One Zone-IA", correct: false, why: "One Zone-IA adds retrieval fees AND lower durability by storing in a single AZ." },
      { text: "S3 Glacier Flexible Retrieval", correct: false, why: "Glacier retrievals take minutes to hours — wrong for data that might be accessed at any time." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 2,
    question:
      "A finance team wants to be alerted before monthly AWS spend exceeds budget and to analyze which services drive costs. Which TWO tools should they use?",
    options: [
      { text: "AWS Budgets with alert thresholds", correct: true, why: "Budgets sends proactive alerts (including forecasted overruns) before spend crosses defined limits." },
      { text: "AWS Cost Explorer", correct: true, why: "Cost Explorer breaks down historical and forecasted spend by service, account, and tag." },
      { text: "AWS Trusted Advisor security checks", correct: false, why: "Trusted Advisor's security checks flag configuration risks, not budget alerts." },
      { text: "AWS CloudTrail", correct: false, why: "CloudTrail records API calls for auditing; it contains no cost data." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Developers leave dev/test EC2 instances running around the clock, though they are only used on weekdays 9am–6pm. What is the simplest way to cut this cost?",
    options: [
      { text: "Schedule automatic stop/start (e.g., Instance Scheduler or EventBridge + Lambda).", correct: true, why: "Stopping instances outside working hours cuts their compute cost by roughly 65–70% with no workflow change." },
      { text: "Buy Reserved Instances for the dev environment.", correct: false, why: "RIs discount 24/7 usage — paying less for idle nights is still paying for idle nights." },
      { text: "Migrate all dev work to larger shared instances.", correct: false, why: "Consolidation may help slightly but changes workflows and still runs 24/7." },
      { text: "Switch dev instances to Dedicated Hosts.", correct: false, why: "Dedicated Hosts increase costs — they solve licensing needs, not idle waste." },
    ],
  },

  // ---------- Newer exam-style questions (Transit Gateway, PrivateLink, EventBridge, ----------
  // ---------- Aurora Global/Serverless, Fargate, Storage Gateway, DataSync, etc.) ----------
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A SaaS provider wants to expose an API running behind a Network Load Balancer to hundreds of customer VPCs. Traffic must stay on the AWS network, and the provider must not peer with or route to customer VPCs. Which solution meets these requirements?",
    options: [
      { text: "AWS PrivateLink — customers create interface VPC endpoints to the provider's endpoint service.", correct: true, why: "PrivateLink exposes only the service, scales to thousands of consumers, and requires no peering, route table changes, or overlapping-CIDR concerns." },
      { text: "VPC peering with every customer VPC.", correct: false, why: "Peering at that scale is unmanageable, exposes the whole network, and breaks with overlapping CIDRs." },
      { text: "A Transit Gateway shared with all customers.", correct: false, why: "A shared Transit Gateway interconnects entire networks — far more access than exposing one service, and CIDR overlap is still a problem." },
      { text: "Public API with customer IP allowlists.", correct: false, why: "Traffic would traverse the public internet, which the requirement explicitly forbids." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A platform team lets developers create their own IAM roles for applications, but must ensure no developer-created role can ever exceed a defined set of maximum permissions. What should the team use?",
    options: [
      { text: "Permissions boundaries attached to the developer-created roles.", correct: true, why: "A permissions boundary caps the maximum permissions a role can have, regardless of its attached policies." },
      { text: "AWS Config rules to detect over-privileged roles.", correct: false, why: "Config detects violations after the fact; it does not prevent the role from being over-privileged." },
      { text: "An SCP that denies iam:CreateRole.", correct: false, why: "Blocking role creation entirely breaks the self-service model instead of bounding it." },
      { text: "Inline policies instead of managed policies.", correct: false, why: "Inline vs managed is a packaging choice; it imposes no permission ceiling." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A company must discover and report any personally identifiable information (PII) stored across hundreds of S3 buckets, with ongoing automated monitoring. Which service should be used?",
    options: [
      { text: "Amazon Macie", correct: true, why: "Macie uses machine learning and pattern matching to continuously discover and classify sensitive data such as PII in S3." },
      { text: "Amazon GuardDuty", correct: false, why: "GuardDuty detects threats and anomalous activity, not sensitive-data classification." },
      { text: "Amazon Inspector", correct: false, why: "Inspector scans EC2, ECR, and Lambda for software vulnerabilities, not data content." },
      { text: "AWS Shield Advanced", correct: false, why: "Shield is DDoS protection and has nothing to do with data discovery." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "Financial records written to S3 must be impossible to delete or overwrite by ANY user — including the root user — for a 7-year regulatory retention period. What should the architect configure?",
    options: [
      { text: "S3 Object Lock in compliance mode with a 7-year retention period.", correct: true, why: "Compliance mode enforces WORM protection that no identity, including root, can shorten or remove." },
      { text: "S3 Object Lock in governance mode.", correct: false, why: "Governance mode can be bypassed by users with s3:BypassGovernanceRetention — not strict enough for this rule." },
      { text: "A bucket policy denying s3:DeleteObject.", correct: false, why: "Bucket policies can be edited or deleted by an administrator at any time." },
      { text: "S3 Versioning with MFA Delete.", correct: false, why: "MFA Delete raises the bar but authorized users can still permanently delete versions." },
    ],
  },
  {
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A web application behind an ALB must serve HTTPS with a certificate that renews automatically and costs nothing to issue. What is the recommended approach?",
    options: [
      { text: "Request a public certificate from AWS Certificate Manager (ACM) and attach it to the ALB listener.", correct: true, why: "ACM public certificates are free, integrate natively with ALB/CloudFront, and renew automatically." },
      { text: "Buy a certificate from a third-party CA and import it into ACM.", correct: false, why: "Imported certificates cost money and ACM cannot auto-renew them." },
      { text: "Generate a self-signed certificate on the ALB.", correct: false, why: "Browsers reject self-signed certificates, and ALBs don't generate certificates anyway." },
      { text: "Install certbot on every EC2 instance behind the ALB.", correct: false, why: "TLS should terminate at the ALB; per-instance certbot adds fragile operational overhead." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A company has grown to 40 VPCs across several accounts plus an on-premises data center connected via Direct Connect. Managing full-mesh VPC peering has become unmanageable. What should the architect implement?",
    options: [
      { text: "AWS Transit Gateway as a central hub attaching all VPCs and the Direct Connect gateway.", correct: true, why: "Transit Gateway replaces the peering mesh with hub-and-spoke routing that scales to thousands of attachments, including hybrid connectivity." },
      { text: "Continue peering but automate it with CloudFormation.", correct: false, why: "Automation eases creation but the O(n²) mesh, route-table limits, and no-transitive-routing problem remain." },
      { text: "PrivateLink endpoints between every pair of VPCs.", correct: false, why: "PrivateLink shares individual services, not full network connectivity between VPCs." },
      { text: "A VPN connection between each VPC pair.", correct: false, why: "Pairwise VPNs are slower, costlier, and even harder to manage than peering." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A global application requires its Aurora MySQL database to fail over to another Region with an RPO of about 1 second and an RTO of under 1 minute. Which solution meets these targets?",
    options: [
      { text: "Aurora Global Database with a secondary Region cluster.", correct: true, why: "Aurora Global Database replicates with typical sub-second lag and can promote a secondary Region in under a minute." },
      { text: "Cross-Region automated snapshots every hour.", correct: false, why: "Hourly snapshots mean up to an hour of data loss and a slow restore — misses both targets." },
      { text: "RDS Multi-AZ deployment.", correct: false, why: "Multi-AZ fails over within one Region only; it does not survive a Regional outage." },
      { text: "AWS Backup with cross-Region copy.", correct: false, why: "Backup copies are point-in-time and restoring a cluster takes far longer than one minute." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "An e-commerce order workflow involves payment, inventory check, shipping, and a manual fraud-review step that can take up to 3 days. Each step must retry on failure and the workflow state must be durable throughout. Which service should orchestrate this?",
    options: [
      { text: "AWS Step Functions standard workflow", correct: true, why: "Standard workflows durably track state for up to a year, with built-in retries, error handling, and human-approval wait patterns." },
      { text: "A chain of Lambda functions calling each other.", correct: false, why: "Lambda chaining loses state on failure and a 3-day wait vastly exceeds Lambda's 15-minute limit." },
      { text: "SQS with a single consumer polling all steps.", correct: false, why: "SQS moves messages but has no concept of workflow state, branching, or long waits." },
      { text: "EventBridge Scheduler running each step hourly.", correct: false, why: "Scheduled jobs are not a stateful workflow — no retries per step, no coordination between steps." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A payments service must process transactions for each customer in the exact order they were submitted, with no duplicate processing. Which messaging setup meets this?",
    options: [
      { text: "SQS FIFO queue with the customer ID as the message group ID and deduplication enabled.", correct: true, why: "FIFO queues guarantee per-group ordering and exactly-once processing within the deduplication window." },
      { text: "SQS standard queue with a large visibility timeout.", correct: false, why: "Standard queues are best-effort ordering and at-least-once delivery — duplicates and reordering can occur." },
      { text: "SNS topic with message filtering.", correct: false, why: "SNS is pub/sub fan-out; it provides neither strict ordering guarantees for this pattern nor deduplication for queue-less consumers." },
      { text: "Kinesis Data Firehose.", correct: false, why: "Firehose batches data for delivery to storage destinations; it is not a transactional message queue." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "After migrating to hybrid cloud, on-premises servers must resolve private DNS names hosted in a Route 53 private hosted zone, and EC2 instances must resolve on-premises hostnames. What enables this?",
    options: [
      { text: "Route 53 Resolver inbound and outbound endpoints with forwarding rules.", correct: true, why: "Inbound endpoints let on-prem query the private zone; outbound endpoints forward VPC queries to on-prem DNS servers." },
      { text: "A public hosted zone duplicating the private records.", correct: false, why: "Publishing internal names publicly is a security leak and doesn't solve EC2→on-prem resolution." },
      { text: "Hard-coding IPs in /etc/hosts on both sides.", correct: false, why: "Static host files rot immediately in any environment with changing IPs." },
      { text: "An internet-facing DNS proxy on EC2.", correct: false, why: "A self-managed public proxy adds an attack surface and operational burden Route 53 Resolver eliminates." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 2,
    question:
      "A company connects its data center to AWS with a single Direct Connect link. An audit flags the connection as a single point of failure for hybrid workloads. Which TWO actions improve resilience?",
    options: [
      { text: "Add a second Direct Connect connection at a different Direct Connect location.", correct: true, why: "A second DX link in a separate facility removes the single-location failure mode with consistent performance." },
      { text: "Configure an AWS Site-to-Site VPN as a lower-cost failover path.", correct: true, why: "A VPN over the internet is the standard economical backup for Direct Connect failure." },
      { text: "Enable cross-zone load balancing on the ALB.", correct: false, why: "Cross-zone balancing concerns traffic inside AWS, not the hybrid link." },
      { text: "Move workloads to a single AZ to reduce network paths.", correct: false, why: "Concentrating into one AZ reduces resilience — the opposite of the goal." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 2,
    question:
      "A microservice consuming from an SQS queue occasionally receives malformed messages that fail repeatedly and block the consumer with endless retries. Which TWO changes make the pipeline more resilient?",
    options: [
      { text: "Configure a dead-letter queue with a maxReceiveCount redrive policy.", correct: true, why: "After the set number of failed receives, poison messages move aside to the DLQ instead of looping forever." },
      { text: "Set up alarms/analysis on the dead-letter queue to inspect failed messages.", correct: true, why: "A DLQ only helps if someone is notified and can diagnose and replay the failures." },
      { text: "Increase the message retention period to 14 days.", correct: false, why: "Longer retention keeps the poison message around longer — it does nothing about repeated failures." },
      { text: "Switch the queue to FIFO.", correct: false, why: "FIFO adds ordering/dedup semantics; malformed messages would still fail and now also block their group." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "An architecture team wants order events from a custom application routed to three systems: analytics, billing, and email — each receiving only the event types it cares about, with the ability to add SaaS event sources later. Which service fits best?",
    options: [
      { text: "Amazon EventBridge with rules filtering events to each target.", correct: true, why: "EventBridge routes events by content-based rules to many targets and natively integrates SaaS and AWS service event sources." },
      { text: "An SQS queue polled by all three systems.", correct: false, why: "Each SQS message goes to one consumer — three systems can't all receive the same event from one queue." },
      { text: "Direct synchronous API calls from the app to each system.", correct: false, why: "Tight coupling means one slow or down consumer breaks order processing." },
      { text: "Kinesis Data Streams with one shard per system.", correct: false, why: "Sharding partitions data for throughput; it is not per-consumer content filtering, and SaaS integration isn't native." },
    ],
  },
  {
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A company must migrate a 2 TB on-premises Oracle database to Amazon Aurora PostgreSQL with only minutes of downtime. Which combination of tools should be used?",
    options: [
      { text: "AWS Schema Conversion Tool (SCT) to convert the schema, then AWS DMS with ongoing replication for cutover.", correct: true, why: "SCT handles the Oracle→PostgreSQL schema conversion and DMS's CDC replication keeps the target in sync until a near-zero-downtime cutover." },
      { text: "Export to CSV, upload to S3, and import during a weekend outage.", correct: false, why: "A bulk dump/restore of 2 TB means hours of downtime and manual schema conversion." },
      { text: "AWS DataSync to copy the database files to Aurora.", correct: false, why: "DataSync moves files to storage services; Aurora cannot ingest raw Oracle data files." },
      { text: "AWS Application Migration Service (MGN).", correct: false, why: "MGN rehosts entire servers to EC2 — it does not convert Oracle to Aurora PostgreSQL." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A new SaaS product's PostgreSQL workload is highly unpredictable — near zero at night, sharp spikes during business hours. The team wants capacity that scales automatically and bills only for what is used, without managing instances. What should they choose?",
    options: [
      { text: "Aurora Serverless v2", correct: true, why: "Serverless v2 scales database capacity (ACUs) up and down in fine-grained steps within seconds and bills per capacity-second." },
      { text: "RDS PostgreSQL on a large fixed instance.", correct: false, why: "A fixed instance is either overpaying at night or underpowered at peak." },
      { text: "RDS with storage autoscaling.", correct: false, why: "Storage autoscaling grows disk space, not compute capacity." },
      { text: "Self-managed PostgreSQL on Spot Instances.", correct: false, why: "Spot interruptions are unacceptable for a stateful primary database, and self-managing contradicts the requirement." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "Clickstream events must be captured and delivered continuously to S3 in near real time, optionally transformed by Lambda on the way, with NO stream infrastructure to manage or capacity to provision. Which service fits?",
    options: [
      { text: "Amazon Kinesis Data Firehose", correct: true, why: "Firehose is fully managed, auto-scaling delivery to S3/Redshift/OpenSearch, with built-in Lambda transformation and buffering." },
      { text: "Kinesis Data Streams with a custom consumer on EC2", correct: false, why: "Streams requires shard capacity management and a consumer fleet — exactly the infrastructure the team wants to avoid." },
      { text: "SQS with a Lambda writing batches to S3", correct: false, why: "Feasible, but you'd hand-build batching, buffering, retries, and partitioning that Firehose provides out of the box." },
      { text: "AWS Glue ETL jobs every 10 minutes", correct: false, why: "Scheduled batch ETL is not near-real-time delivery." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A team wants to run containerized microservices on AWS with the LEAST operational overhead — no cluster instances to patch, scale, or capacity-plan. Which compute option should they choose?",
    options: [
      { text: "Amazon ECS with AWS Fargate launch type", correct: true, why: "Fargate runs containers serverlessly — AWS manages the underlying hosts entirely, billed per task vCPU/memory." },
      { text: "Amazon ECS with the EC2 launch type", correct: false, why: "EC2 launch type means you still patch, scale, and right-size the container instances." },
      { text: "Self-managed Kubernetes on EC2", correct: false, why: "Running your own control plane and nodes is the maximum operational overhead option." },
      { text: "Amazon EKS with self-managed node groups", correct: false, why: "EKS manages the control plane, but self-managed nodes still leave instance operations on the team." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A REST API on API Gateway backed by Lambda and RDS suffers when marketing campaigns cause sudden 20x traffic bursts; most requests fetch the same catalog data. What protects the backend with MINIMAL code changes?",
    options: [
      { text: "Enable API Gateway caching and set stage throttling limits.", correct: true, why: "Response caching absorbs repeated reads at the gateway and throttling caps the burst that reaches Lambda and RDS — zero code change." },
      { text: "Rewrite the API to use WebSockets.", correct: false, why: "Changing the protocol doesn't reduce backend load and is a major rewrite." },
      { text: "Move the API to a larger EC2 instance.", correct: false, why: "The API runs on managed services; the bottleneck is the burst reaching Lambda/RDS, not a server size." },
      { text: "Increase the Lambda timeout.", correct: false, why: "Longer timeouts make pileups worse under burst load, not better." },
    ],
  },
  {
    domain: "Design High-Performing Architectures",
    pick: 2,
    question:
      "An Aurora MySQL cluster is saturated by read traffic while writes remain modest. Which TWO steps scale read performance the recommended way?",
    options: [
      { text: "Add Aurora Replicas to the cluster.", correct: true, why: "Aurora supports up to 15 low-lag replicas sharing the cluster storage volume for read scaling." },
      { text: "Point read-only application traffic at the cluster reader endpoint.", correct: true, why: "The reader endpoint automatically load-balances connections across all replicas — no custom routing code." },
      { text: "Enable Multi-AZ on the writer.", correct: false, why: "Failover standbys improve availability; they do not serve reads in Aurora's model (replicas do)." },
      { text: "Double the writer instance size.", correct: false, why: "Vertical scaling of the writer is the costly, ceiling-limited way to absorb read traffic replicas should handle." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A company must migrate 500 TB from an on-premises NFS array to Amazon S3 over an existing 10 Gbps Direct Connect link, with scheduling, bandwidth throttling, and automatic integrity verification. Which service should be used?",
    options: [
      { text: "AWS DataSync", correct: true, why: "DataSync is purpose-built for online NFS/SMB-to-AWS transfers with scheduling, throttling, and end-to-end verification." },
      { text: "AWS Snowball Edge", correct: false, why: "Snowball is for when the network is the bottleneck — with 10 Gbps available, shipping devices adds needless delay and handling." },
      { text: "aws s3 cp in a loop from a mounted share", correct: false, why: "CLI scripts give you no scheduling, verification, or incremental-sync management at 500 TB scale." },
      { text: "AWS Transfer Family", correct: false, why: "Transfer Family provides SFTP/FTPS endpoints INTO S3 for partners; it is not a bulk migration engine." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A remote research station has 80 TB of data to move to S3 within two weeks, but its internet uplink is only 100 Mbps and cannot be upgraded. What is the most practical transfer method?",
    options: [
      { text: "Order an AWS Snowball Edge device, load the data locally, and ship it back to AWS.", correct: true, why: "80 TB over 100 Mbps would take roughly 2.5 months; a shipped Snowball completes the job within days." },
      { text: "S3 Transfer Acceleration.", correct: false, why: "Acceleration optimizes the route, but a 100 Mbps pipe is still the hard ceiling — months of transfer." },
      { text: "Multipart uploads run in parallel.", correct: false, why: "Parallelism can't exceed the physical uplink bandwidth either." },
      { text: "AWS DataSync with compression.", correct: false, why: "DataSync still rides the same 100 Mbps link; even good compression won't close a 10x time gap." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "An on-premises file server is running out of space. Users need continued low-latency SMB access to recently used files, while the full data set should live cheaply in S3. Which solution fits?",
    options: [
      { text: "AWS Storage Gateway — Amazon S3 File Gateway with local cache.", correct: true, why: "File Gateway presents SMB/NFS shares backed by S3, caching hot files locally for low-latency access." },
      { text: "Mount an EFS file system over the internet.", correct: false, why: "EFS is designed for access from within AWS networks; WAN-mounting NFS gives poor latency and EFS costs far more than S3." },
      { text: "Sync everything to every user's laptop.", correct: false, why: "Full local copies multiply storage use — the opposite of offloading." },
      { text: "Replace the file server with larger disks.", correct: false, why: "Buying hardware continues the capex cycle the company is trying to escape and ignores the S3 requirement." },
    ],
  },
  {
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Analysts need to run occasional ad-hoc SQL queries over JSON and Parquet files already stored in S3. Queries run a few times per week. What is the MOST cost-effective solution?",
    options: [
      { text: "Amazon Athena querying the S3 data in place.", correct: true, why: "Athena is serverless and bills per TB scanned — perfect for occasional queries with zero infrastructure." },
      { text: "A persistent Amazon Redshift cluster.", correct: false, why: "A cluster running 24/7 for a few weekly queries is mostly paid idle time." },
      { text: "Load the data into RDS and query there.", correct: false, why: "ETL into a relational database adds cost and effort for data that can be queried where it sits." },
      { text: "An EMR cluster with Spark SQL.", correct: false, why: "EMR is powerful for heavy processing but is oversized, always-on infrastructure for ad-hoc queries." },
    ],
  },
];
