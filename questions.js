// AWS Solutions Architect Associate (SAA-C03) practice question bank.
//
// Each question:
//   topic    - study topic, used for the topic filter on the start screen (see TOPICS)
//   domain   - one of the four SAA-C03 exam domains (used for the results breakdown)
//   pick     - how many options must be selected (1 = radio, 2+ = checkboxes)
//   options  - each option has `text`, `correct`, and a one-liner `why`
//
// Questions are identified internally by a hash of their text, so the app can
// track which ones you have already seen. Editing a question's text makes the
// app treat it as new — that is fine and intentional.

const TOPICS = [
  "IAM & Identity",
  "Data Protection & Encryption",
  "Network & Edge Security",
  "VPC & Hybrid Connectivity",
  "DNS, CDN & Global Traffic",
  "Compute, Containers & Scaling",
  "Storage",
  "Databases",
  "Decoupling & Integration",
  "Analytics & Data Pipelines",
  "Migration & Transfer",
  "Cost Management & Governance",
];

const QUESTION_BANK = [
  // ============================================================
  // IAM & Identity
  // ============================================================
  {
    topic: "IAM & Identity",
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
    topic: "IAM & Identity",
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
    topic: "IAM & Identity",
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
    topic: "IAM & Identity",
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
  {
    topic: "IAM & Identity",
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
    topic: "IAM & Identity",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An organization must guarantee that no account in its 'Sandbox' OU can ever launch resources outside eu-west-1, even by an account administrator. What should be applied?",
    options: [
      { text: "A Service Control Policy on the Sandbox OU denying all actions outside eu-west-1.", correct: true, why: "SCPs are organization guardrails that even account administrators and root cannot override." },
      { text: "An IAM policy attached to every user in those accounts.", correct: false, why: "An account admin can simply detach or edit an IAM policy in their own account." },
      { text: "AWS Config rules flagging out-of-Region resources.", correct: false, why: "Config reports violations after resources exist rather than preventing them." },
      { text: "A permissions boundary on the account root user.", correct: false, why: "Permissions boundaries cannot be applied to the root user." },
    ],
  },
  {
    topic: "IAM & Identity",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An on-premises Active Directory is the company's source of truth for employee identity. Employees need single sign-on to the AWS Management Console without new credentials. What should be configured?",
    options: [
      { text: "Federation — connect AD to IAM Identity Center (or a SAML 2.0 identity provider in IAM).", correct: true, why: "SAML federation lets employees sign in with existing corporate credentials and assume roles in AWS." },
      { text: "Create matching IAM users and sync passwords nightly.", correct: false, why: "Duplicating identities and syncing passwords is insecure and an operational nightmare." },
      { text: "Share a single IAM user among all employees.", correct: false, why: "Shared credentials destroy accountability and auditability." },
      { text: "Use Amazon Cognito user pools for employee console access.", correct: false, why: "Cognito targets application end users, not workforce console SSO." },
    ],
  },
  {
    topic: "IAM & Identity",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A Lambda function must read from a DynamoDB table and publish to an SNS topic. How should permissions be granted following best practice?",
    options: [
      { text: "An execution role with a policy granting only dynamodb:GetItem on that table and sns:Publish on that topic.", correct: true, why: "A scoped execution role is least privilege — specific actions on specific resource ARNs." },
      { text: "An execution role with the AdministratorAccess managed policy.", correct: false, why: "Full admin rights on a function that needs two actions is a textbook least-privilege violation." },
      { text: "Access keys stored in Lambda environment variables.", correct: false, why: "Lambda has native role support; storing keys adds risk with no benefit." },
      { text: "A resource policy on the Lambda function.", correct: false, why: "A Lambda resource policy controls who can invoke the function, not what the function can access." },
    ],
  },
  {
    topic: "IAM & Identity",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A security review finds an IAM role with broad permissions. The team needs to know which permissions the role has actually used in the last 90 days so unused ones can be removed. Which tool provides this?",
    options: [
      { text: "IAM Access Advisor (service last accessed data).", correct: true, why: "Access Advisor shows which services a principal actually used and when, guiding permission trimming." },
      { text: "Amazon Inspector.", correct: false, why: "Inspector scans workloads for software vulnerabilities, not IAM permission usage." },
      { text: "AWS Trusted Advisor.", correct: false, why: "Trusted Advisor gives broad best-practice checks, not per-role permission usage history." },
      { text: "Amazon Macie.", correct: false, why: "Macie classifies sensitive data in S3; it has no view of IAM usage." },
    ],
  },

  // ============================================================
  // Data Protection & Encryption
  // ============================================================
  {
    topic: "Data Protection & Encryption",
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
    topic: "Data Protection & Encryption",
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
    topic: "Data Protection & Encryption",
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
    topic: "Data Protection & Encryption",
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
    topic: "Data Protection & Encryption",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "Regulations require that the company generate and hold its own key material, and that the key never exists in plaintext outside a validated hardware security module it controls. Which service meets this?",
    options: [
      { text: "AWS CloudHSM", correct: true, why: "CloudHSM gives single-tenant, FIPS 140-2 Level 3 HSMs where the customer alone controls and holds the keys." },
      { text: "AWS KMS with an AWS managed key", correct: false, why: "AWS managed keys are created and controlled by AWS — the opposite of the requirement." },
      { text: "Secrets Manager with automatic rotation", correct: false, why: "Secrets Manager stores application secrets; it is not an HSM for customer-held key material." },
      { text: "SSE-S3 encryption", correct: false, why: "SSE-S3 keys are entirely AWS managed with no customer key custody." },
    ],
  },
  {
    topic: "Data Protection & Encryption",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An unencrypted production RDS MySQL instance must be encrypted at rest with minimal data loss. What is the correct procedure?",
    options: [
      { text: "Take a snapshot, copy the snapshot with encryption enabled, and restore a new instance from the encrypted copy.", correct: true, why: "You cannot encrypt an existing RDS instance in place — encrypting the snapshot copy on restore is the supported path." },
      { text: "Enable encryption on the running instance from the console.", correct: false, why: "RDS does not allow toggling encryption on an existing instance." },
      { text: "Attach an encrypted EBS volume to the RDS instance.", correct: false, why: "RDS storage is managed — you cannot attach your own EBS volumes." },
      { text: "Enable SSL/TLS for client connections.", correct: false, why: "TLS encrypts data in transit, not data at rest." },
    ],
  },
  {
    topic: "Data Protection & Encryption",
    domain: "Design Secure Architectures",
    pick: 2,
    question:
      "A compliance team requires that S3 objects be encrypted in transit and that any unencrypted upload be rejected. Which TWO measures accomplish this?",
    options: [
      { text: "A bucket policy denying requests where aws:SecureTransport is false.", correct: true, why: "This condition rejects any plain HTTP request, forcing TLS for all access." },
      { text: "A bucket policy denying s3:PutObject when the encryption header is absent.", correct: true, why: "A condition on s3:x-amz-server-side-encryption rejects uploads that don't request encryption." },
      { text: "Enabling S3 Versioning.", correct: false, why: "Versioning preserves object history; it has no bearing on encryption." },
      { text: "Enabling S3 Transfer Acceleration.", correct: false, why: "Transfer Acceleration is a performance feature, unrelated to encryption enforcement." },
    ],
  },
  {
    topic: "Data Protection & Encryption",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A team needs to share an encrypted EBS snapshot with another AWS account. What must be true?",
    options: [
      { text: "The snapshot must be encrypted with a customer managed KMS key, and that key must be shared with the target account.", correct: true, why: "Snapshots encrypted with the default AWS managed key cannot be shared — a customer managed key with a cross-account grant is required." },
      { text: "Encrypted snapshots can be shared publicly like unencrypted ones.", correct: false, why: "AWS never allows encrypted snapshots to be made public." },
      { text: "The snapshot must first be decrypted by removing the KMS key.", correct: false, why: "You cannot strip encryption from a snapshot; you would have to copy to an unencrypted volume, defeating the purpose." },
      { text: "Both accounts must be in the same VPC.", correct: false, why: "Snapshot sharing is an account/KMS permission matter, not a network one." },
    ],
  },
  {
    topic: "Data Protection & Encryption",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An application stores configuration values, some of which are sensitive (API tokens), and the team wants a free option with hierarchical organization and KMS encryption. Which service is the best fit?",
    options: [
      { text: "AWS Systems Manager Parameter Store with SecureString parameters.", correct: true, why: "Parameter Store's standard tier is free, supports hierarchical paths, and encrypts SecureString values with KMS." },
      { text: "AWS Secrets Manager.", correct: false, why: "It works but charges per secret per month — unnecessary when automatic rotation isn't required." },
      { text: "Environment variables in plaintext.", correct: false, why: "Plaintext tokens in environment variables are exposed to anyone who can describe the resource." },
      { text: "A DynamoDB table with a custom encryption layer.", correct: false, why: "Building your own secret store duplicates a managed service badly." },
    ],
  },

  // ============================================================
  // Network & Edge Security
  // ============================================================
  {
    topic: "Network & Edge Security",
    domain: "Design Secure Architectures",
    pick: 1,
    question: "Which statement about security groups and network ACLs is correct?",
    options: [
      { text: "Security groups are stateful; network ACLs are stateless.", correct: true, why: "Return traffic is automatically allowed by security groups, while NACLs require explicit inbound and outbound rules." },
      { text: "Security groups are stateless; network ACLs are stateful.", correct: false, why: "It is the reverse — security groups track connection state, NACLs do not." },
      { text: "Both are stateful.", correct: false, why: "NACLs are stateless; return traffic must be explicitly allowed." },
      { text: "Security groups support explicit deny rules.", correct: false, why: "Security groups only have allow rules; explicit deny is a NACL feature." },
    ],
  },
  {
    topic: "Network & Edge Security",
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
    topic: "Network & Edge Security",
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
    topic: "Network & Edge Security",
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
    topic: "Network & Edge Security",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A security team wants continuous, automated detection of compromised EC2 instances, crypto-mining activity, and anomalous IAM API calls using existing log sources. Which service should be enabled?",
    options: [
      { text: "Amazon GuardDuty", correct: true, why: "GuardDuty continuously analyzes CloudTrail, VPC Flow Logs, and DNS logs with threat intelligence to flag exactly these behaviors." },
      { text: "AWS Config", correct: false, why: "Config tracks resource configuration compliance, not active threats." },
      { text: "AWS CloudTrail alone", correct: false, why: "CloudTrail records the API calls but performs no threat detection or analysis on them." },
      { text: "Amazon Inspector", correct: false, why: "Inspector finds software vulnerabilities and unintended exposure, not live attacker behavior." },
    ],
  },
  {
    topic: "Network & Edge Security",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A high-profile application requires DDoS protection with 24/7 access to the AWS DDoS Response Team and cost protection against scaling charges during an attack. What is required?",
    options: [
      { text: "AWS Shield Advanced", correct: true, why: "Shield Advanced adds DRT support, advanced attack mitigation, and billing protection over the free Shield Standard." },
      { text: "AWS Shield Standard", correct: false, why: "Standard is automatic and free but includes no DRT access or cost protection." },
      { text: "AWS WAF alone", correct: false, why: "WAF filters application-layer requests but provides no DRT support or DDoS cost protection." },
      { text: "Amazon GuardDuty", correct: false, why: "GuardDuty is a detection service, not DDoS mitigation." },
    ],
  },
  {
    topic: "Network & Edge Security",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An architect must record all network traffic metadata entering and leaving EC2 network interfaces to investigate a suspected data exfiltration. What should be enabled?",
    options: [
      { text: "VPC Flow Logs sent to CloudWatch Logs or S3.", correct: true, why: "Flow Logs capture accepted and rejected IP traffic metadata per ENI, subnet, or VPC." },
      { text: "AWS CloudTrail data events.", correct: false, why: "CloudTrail records AWS API calls, not network packet flows between hosts." },
      { text: "CloudWatch detailed monitoring.", correct: false, why: "Detailed monitoring increases metric frequency; it captures no traffic information." },
      { text: "AWS Config recorder.", correct: false, why: "Config tracks configuration changes, not traffic." },
    ],
  },
  {
    topic: "Network & Edge Security",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "Only requests from a corporate VPN's fixed public IP range should reach an internet-facing ALB. What is the simplest way to enforce this?",
    options: [
      { text: "Restrict the ALB's security group inbound rules to the corporate CIDR range.", correct: true, why: "A security group on the ALB is the most direct control over which sources can connect." },
      { text: "Add a NACL rule on the private subnets.", correct: false, why: "The ALB lives in the public subnets — private-subnet NACLs are the wrong control point." },
      { text: "Use a Route 53 geolocation policy.", correct: false, why: "DNS policies influence which record is returned; anyone with the ALB DNS name can still connect." },
      { text: "Enable Shield Advanced.", correct: false, why: "Shield mitigates DDoS; it does not implement IP allowlisting." },
    ],
  },
  {
    topic: "Network & Edge Security",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A team needs automated vulnerability scanning of EC2 instances and container images in ECR, with findings prioritized by severity. Which service does this?",
    options: [
      { text: "Amazon Inspector", correct: true, why: "Inspector continuously scans EC2, ECR images, and Lambda for CVEs and produces risk-scored findings." },
      { text: "Amazon Macie", correct: false, why: "Macie classifies sensitive data in S3, not software vulnerabilities." },
      { text: "AWS Security Hub alone", correct: false, why: "Security Hub aggregates findings from other services; it is not itself a scanner." },
      { text: "AWS Firewall Manager", correct: false, why: "Firewall Manager centrally administers WAF/Shield/security group policies, not vulnerability scans." },
    ],
  },

  // ============================================================
  // VPC & Hybrid Connectivity
  // ============================================================
  {
    topic: "VPC & Hybrid Connectivity",
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
    topic: "VPC & Hybrid Connectivity",
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
    topic: "VPC & Hybrid Connectivity",
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
    topic: "VPC & Hybrid Connectivity",
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
    topic: "VPC & Hybrid Connectivity",
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
    topic: "VPC & Hybrid Connectivity",
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
    topic: "VPC & Hybrid Connectivity",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A hybrid application requires consistent, dedicated bandwidth of 10 Gbps between the on-premises data center and AWS, with predictable latency. Which connectivity option should be chosen?",
    options: [
      { text: "AWS Direct Connect", correct: true, why: "Direct Connect provides a dedicated private circuit with consistent bandwidth and latency, unlike the public internet." },
      { text: "AWS Site-to-Site VPN", correct: false, why: "VPN rides the public internet, so bandwidth and latency vary and per-tunnel throughput is limited." },
      { text: "AWS Transit Gateway alone", correct: false, why: "Transit Gateway routes traffic within AWS; it is not itself a link to on-premises." },
      { text: "AWS Global Accelerator", correct: false, why: "Global Accelerator optimizes internet paths to AWS endpoints, not a dedicated private circuit." },
    ],
  },
  {
    topic: "VPC & Hybrid Connectivity",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "EC2 instances in a private subnet with no internet route must call the Amazon SQS API. What is the correct solution?",
    options: [
      { text: "Create an interface VPC endpoint (PrivateLink) for SQS in the VPC.", correct: true, why: "Interface endpoints put an ENI for the AWS service inside your subnet, so API calls never leave the AWS network." },
      { text: "Create a gateway VPC endpoint for SQS.", correct: false, why: "Gateway endpoints exist only for S3 and DynamoDB; every other service uses interface endpoints." },
      { text: "Add an internet gateway route to the private subnet.", correct: false, why: "That makes the subnet public, contradicting the design." },
      { text: "Use a NAT gateway and accept the internet path.", correct: false, why: "It would work but sends traffic over the internet and adds per-GB charges an endpoint avoids." },
    ],
  },
  {
    topic: "VPC & Hybrid Connectivity",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "Two VPCs in different Regions must exchange private traffic, and both are managed by the same company with non-overlapping CIDRs. Traffic volume is modest and only these two VPCs are involved. What is the simplest solution?",
    options: [
      { text: "Inter-Region VPC peering", correct: true, why: "For a single pair of VPCs, peering is the simplest, lowest-cost private connection with no hourly hub charge." },
      { text: "Transit Gateway peering between Regions", correct: false, why: "Correct at scale, but adds Transit Gateway cost and complexity for just two VPCs." },
      { text: "Site-to-Site VPN between the VPCs", correct: false, why: "VPN adds encryption overhead and lower throughput where peering already keeps traffic on the AWS backbone." },
      { text: "AWS PrivateLink", correct: false, why: "PrivateLink exposes individual services, not general VPC-to-VPC connectivity." },
    ],
  },
  {
    topic: "VPC & Hybrid Connectivity",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An architect designs a VPC where web servers must be reachable from the internet and database servers must not be. What is the standard design?",
    options: [
      { text: "Web servers in public subnets with a route to an internet gateway; databases in private subnets with no such route.", correct: true, why: "Subnet tier separation by route table is the fundamental VPC pattern for exposing only what must be public." },
      { text: "All servers in public subnets, secured only by security groups.", correct: false, why: "It works technically but removes the network-layer defense in depth the exam expects." },
      { text: "All servers in private subnets with an internet gateway attached to the database subnet.", correct: false, why: "Adding an IGW route to the database subnet makes it public — the exact opposite of the requirement." },
      { text: "Web and database servers in different Regions.", correct: false, why: "Cross-Region separation adds latency and complexity without addressing subnet-level exposure." },
    ],
  },

  // ============================================================
  // DNS, CDN & Global Traffic
  // ============================================================
  {
    topic: "DNS, CDN & Global Traffic",
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
    topic: "DNS, CDN & Global Traffic",
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
    topic: "DNS, CDN & Global Traffic",
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
    topic: "DNS, CDN & Global Traffic",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "An application is deployed in four Regions. Users should always be routed to the Region that gives them the fastest response time. Which Route 53 policy should be used?",
    options: [
      { text: "Latency-based routing", correct: true, why: "Latency-based routing sends each user to the Region with the lowest measured network latency from their location." },
      { text: "Geolocation routing", correct: false, why: "Geolocation routes by the user's country, which is not always the lowest-latency Region." },
      { text: "Weighted routing", correct: false, why: "Weighted routing splits traffic by ratio regardless of performance." },
      { text: "Multivalue answer routing", correct: false, why: "Multivalue returns several healthy records at random — it is a poor man's load balancer, not latency aware." },
    ],
  },
  {
    topic: "DNS, CDN & Global Traffic",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A streaming service must ensure that premium video files in CloudFront can only be downloaded by paying subscribers, using time-limited URLs. What should be implemented?",
    options: [
      { text: "CloudFront signed URLs or signed cookies.", correct: true, why: "Signed URLs/cookies grant time-limited, policy-bound access to specific CloudFront content." },
      { text: "A public CloudFront distribution with obscure file names.", correct: false, why: "Security by obscurity — anyone who obtains or guesses the URL keeps access forever." },
      { text: "S3 bucket ACLs granting each subscriber access.", correct: false, why: "S3 ACLs do not scale to end users and don't apply to CloudFront delivery." },
      { text: "AWS WAF rate limiting.", correct: false, why: "Rate limiting throttles abuse but does not authenticate paying subscribers." },
    ],
  },
  {
    topic: "DNS, CDN & Global Traffic",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A company wants to gradually shift 10% of production traffic to a new application version running on separate infrastructure, increasing the share over time. Which Route 53 policy supports this?",
    options: [
      { text: "Weighted routing", correct: true, why: "Weighted records let you dial the percentage of traffic to each version for canary and blue/green rollouts." },
      { text: "Failover routing", correct: false, why: "Failover is binary — all traffic to primary until it fails." },
      { text: "Geolocation routing", correct: false, why: "Geolocation splits by user location, not by controllable percentage." },
      { text: "Simple routing", correct: false, why: "Simple routing offers no traffic-splitting control at all." },
    ],
  },
  {
    topic: "DNS, CDN & Global Traffic",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A dynamic web application delivered through CloudFront needs to run lightweight logic — such as A/B test header rewriting — on every request at the edge with sub-millisecond overhead and no state. What should be used?",
    options: [
      { text: "CloudFront Functions", correct: true, why: "CloudFront Functions run JavaScript at edge locations in sub-millisecond time, ideal for header and URL manipulation." },
      { text: "Lambda@Edge", correct: false, why: "Lambda@Edge is more capable but runs at regional edge caches with higher latency and cost than needed here." },
      { text: "An EC2 fleet behind the distribution", correct: false, why: "Adding origin compute defeats the purpose of doing the work at the edge." },
      { text: "API Gateway request mapping templates", correct: false, why: "API Gateway is a regional service and is not in the CloudFront request path by default." },
    ],
  },
  {
    topic: "DNS, CDN & Global Traffic",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "During a Region evacuation test, DNS changes took over an hour to take effect for many users. What is the most likely cause and fix?",
    options: [
      { text: "The record's TTL was set too high — lower the TTL well before a planned failover.", correct: true, why: "Resolvers cache records for the TTL duration, so a long TTL delays how quickly clients see the new endpoint." },
      { text: "Route 53 health checks were disabled — enable them.", correct: false, why: "Health checks affect when Route 53 changes its answer, not how long clients cache the old one." },
      { text: "The hosted zone was private — make it public.", correct: false, why: "Zone type doesn't govern propagation speed." },
      { text: "Alias records propagate slower than CNAMEs — switch to CNAME.", correct: false, why: "Alias records are not slower; they're generally preferred and free for AWS targets." },
    ],
  },

  // ============================================================
  // Compute, Containers & Scaling
  // ============================================================
  {
    topic: "Compute, Containers & Scaling",
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
    topic: "Compute, Containers & Scaling",
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
    topic: "Compute, Containers & Scaling",
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
    topic: "Compute, Containers & Scaling",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "An Auto Scaling group must keep average CPU utilization near 60% as traffic varies unpredictably throughout the day. Which scaling policy is the best fit?",
    options: [
      { text: "Target tracking scaling on average CPU utilization", correct: true, why: "Target tracking automatically adds or removes capacity to hold the metric at the chosen target, like a thermostat." },
      { text: "Scheduled scaling at fixed times", correct: false, why: "Schedules only work when load is predictable by clock time." },
      { text: "Manual scaling by the on-call engineer", correct: false, why: "Human reaction time cannot track unpredictable intraday traffic." },
      { text: "Simple scaling with a long cooldown", correct: false, why: "Simple scaling reacts in coarse steps with cooldown delays; target tracking is the modern recommendation." },
    ],
  },
  {
    topic: "Compute, Containers & Scaling",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "An application must route traffic to different backend target groups based on the URL path (/api and /images). Which load balancer should be used?",
    options: [
      { text: "Application Load Balancer with path-based routing rules", correct: true, why: "ALBs operate at layer 7 and can route by path, host header, query string, and more." },
      { text: "Network Load Balancer", correct: false, why: "NLB works at layer 4 (TCP/UDP) and cannot inspect URL paths." },
      { text: "Gateway Load Balancer", correct: false, why: "GWLB is for inserting third-party network appliances, not application routing." },
      { text: "Classic Load Balancer", correct: false, why: "The CLB is legacy with only basic layer 4/7 support and no path-based rules." },
    ],
  },
  {
    topic: "Compute, Containers & Scaling",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A TCP-based application requires millions of requests per second with ultra-low latency and a static IP per Availability Zone. Which load balancer meets this?",
    options: [
      { text: "Network Load Balancer", correct: true, why: "NLB handles millions of requests per second at ultra-low latency and supports static/Elastic IPs per AZ." },
      { text: "Application Load Balancer", correct: false, why: "ALB is HTTP-focused, adds layer 7 processing latency, and has no static IPs." },
      { text: "Classic Load Balancer", correct: false, why: "The legacy CLB cannot match NLB performance and lacks static IP support." },
      { text: "Route 53 with multivalue answers", correct: false, why: "DNS round-robin is not a load balancer and offers no connection-level performance guarantees." },
    ],
  },
  {
    topic: "Compute, Containers & Scaling",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "Instances behind an ALB are being marked healthy by EC2 status checks but are returning HTTP 500 errors, and traffic keeps flowing to them. What should be configured?",
    options: [
      { text: "ELB health checks against an application endpoint, with the ASG set to use ELB health check type.", correct: true, why: "Only application-level health checks detect a broken app on a running instance, and the ASG must honor them to replace it." },
      { text: "Increase the instance size.", correct: false, why: "A bigger instance still returns 500s if the application is broken." },
      { text: "Enable detailed CloudWatch monitoring.", correct: false, why: "More metrics improve visibility but do not remove unhealthy targets from rotation." },
      { text: "Enable cross-zone load balancing.", correct: false, why: "That evens traffic distribution; it does not detect application failure." },
    ],
  },
  {
    topic: "Compute, Containers & Scaling",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A Lambda-backed API shows occasional multi-second response times on the first request after idle periods, which violates its latency SLA. What addresses this directly?",
    options: [
      { text: "Enable provisioned concurrency on the function.", correct: true, why: "Provisioned concurrency keeps execution environments initialized, eliminating cold-start latency." },
      { text: "Increase the function timeout.", correct: false, why: "A longer timeout permits slow requests; it does not make them fast." },
      { text: "Increase the function's memory to the maximum.", correct: false, why: "More memory speeds execution somewhat but does not remove cold starts." },
      { text: "Move the function into a VPC.", correct: false, why: "VPC attachment historically added networking setup time — it does not help and can hurt." },
    ],
  },
  {
    topic: "Compute, Containers & Scaling",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A legacy application stores user session data in memory on each EC2 instance, so users are logged out whenever the Auto Scaling group replaces an instance. What is the best fix?",
    options: [
      { text: "Store session state externally in ElastiCache or DynamoDB.", correct: true, why: "Externalizing session state makes instances stateless and freely replaceable — the standard cloud pattern." },
      { text: "Enable sticky sessions on the load balancer.", correct: false, why: "Stickiness pins a user to one instance, so sessions still vanish when that instance is replaced." },
      { text: "Disable Auto Scaling termination.", correct: false, why: "Blocking replacement sacrifices elasticity and self-healing to hide the design flaw." },
      { text: "Increase instance memory.", correct: false, why: "Session loss is caused by instance replacement, not memory pressure." },
    ],
  },
  {
    topic: "Compute, Containers & Scaling",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A workload runs on EC2 continuously but the team is unsure whether it will stay on m6i instances or move to a different family within a year. Which purchase option offers a discount with that flexibility?",
    options: [
      { text: "Compute Savings Plans", correct: true, why: "Compute Savings Plans apply across instance families, sizes, Regions, Fargate, and Lambda for a spend commitment." },
      { text: "Standard Reserved Instances for m6i", correct: false, why: "Standard RIs lock in the family, removing exactly the flexibility the team needs." },
      { text: "Spot Instances", correct: false, why: "Spot capacity can be reclaimed with two minutes' notice — not for steady production." },
      { text: "Dedicated Hosts", correct: false, why: "Dedicated Hosts are for licensing and compliance and cost the most." },
    ],
  },
  {
    topic: "Compute, Containers & Scaling",
    domain: "Design Resilient Architectures",
    pick: 2,
    question:
      "A batch-processing fleet uses Spot Instances to save cost, but jobs sometimes fail when instances are reclaimed. Which TWO practices improve resilience?",
    options: [
      { text: "Handle the two-minute Spot interruption notice to checkpoint work and drain gracefully.", correct: true, why: "The interruption notice lets the application save progress before the instance is reclaimed." },
      { text: "Use a diversified Spot fleet across multiple instance types and AZs.", correct: true, why: "Diversification reduces the chance that a single capacity pool shortage takes out the whole fleet." },
      { text: "Set the Spot maximum price to the On-Demand price and assume no interruptions.", correct: false, why: "Price does not prevent reclamation — interruptions are driven by capacity, not just bid." },
      { text: "Store job state only in instance store volumes.", correct: false, why: "Instance store data is destroyed on termination, guaranteeing loss on interruption." },
    ],
  },

  // ============================================================
  // Storage
  // ============================================================
  {
    topic: "Storage",
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
    topic: "Storage",
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
    topic: "Storage",
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
    topic: "Storage",
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
    topic: "Storage",
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
  {
    topic: "Storage",
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
    topic: "Storage",
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
    topic: "Storage",
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
    topic: "Storage",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A developer accidentally overwrote several important objects in an S3 bucket. What feature would have allowed immediate recovery of the previous content?",
    options: [
      { text: "S3 Versioning", correct: true, why: "Versioning retains every prior version of an object, so an overwrite can be rolled back instantly." },
      { text: "S3 Lifecycle policies", correct: false, why: "Lifecycle rules transition or expire objects; they do not preserve overwritten content." },
      { text: "S3 Storage Lens", correct: false, why: "Storage Lens reports usage and activity metrics — it stores no data copies." },
      { text: "S3 Transfer Acceleration", correct: false, why: "A transfer performance feature with no recovery capability." },
    ],
  },
  {
    topic: "Storage",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A machine learning training job on EC2 needs a shared file system delivering hundreds of GB/s throughput with sub-millisecond latency, linked to a data set in S3. Which service should be used?",
    options: [
      { text: "Amazon FSx for Lustre", correct: true, why: "FSx for Lustre is built for HPC/ML workloads and can transparently present and sync an S3 data set." },
      { text: "Amazon EFS Standard", correct: false, why: "EFS scales well but cannot match Lustre's throughput and latency for HPC-class training." },
      { text: "EBS gp3 volumes on each instance", correct: false, why: "EBS volumes are not shared across many instances and would require manual data distribution." },
      { text: "S3 accessed directly per file", correct: false, why: "Direct object GETs per training file add latency that a parallel file system removes." },
    ],
  },
  {
    topic: "Storage",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Easily reproducible temporary data (rendered thumbnails) is stored in S3 and accessed a few times a month. Losing it would only mean regenerating it. What is the cheapest sensible storage class?",
    options: [
      { text: "S3 One Zone-IA", correct: true, why: "One Zone-IA costs about 20% less than Standard-IA and its single-AZ durability is acceptable for reproducible data." },
      { text: "S3 Standard", correct: false, why: "Paying the top tier for rarely accessed, regenerable data wastes money." },
      { text: "S3 Glacier Deep Archive", correct: false, why: "Monthly access with hours-long retrieval times would break the application's usability." },
      { text: "S3 Standard-IA", correct: false, why: "Reasonable, but One Zone-IA is cheaper and its lower durability is fine here." },
    ],
  },
  {
    topic: "Storage",
    domain: "Design Cost-Optimized Architectures",
    pick: 2,
    question:
      "An S3 bucket's cost is unexpectedly high. Investigation shows many incomplete multipart uploads and thousands of old object versions. Which TWO lifecycle actions reduce cost?",
    options: [
      { text: "Add a lifecycle rule to abort incomplete multipart uploads after 7 days.", correct: true, why: "Orphaned multipart parts are billed as storage indefinitely until explicitly aborted." },
      { text: "Add a lifecycle rule to expire or transition noncurrent object versions.", correct: true, why: "Old versions accumulate silently and are billed at full rate unless a noncurrent-version rule handles them." },
      { text: "Disable versioning to delete existing versions.", correct: false, why: "Suspending versioning stops new versions but does not delete the existing ones already billed." },
      { text: "Enable Transfer Acceleration.", correct: false, why: "That adds a per-GB charge — it increases cost rather than reducing it." },
    ],
  },

  // ============================================================
  // Databases
  // ============================================================
  {
    topic: "Databases",
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
    topic: "Databases",
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
    topic: "Databases",
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
    topic: "Databases",
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
    topic: "Databases",
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
    topic: "Databases",
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
    topic: "Databases",
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
    topic: "Databases",
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
    topic: "Databases",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "An application needs single-digit millisecond lookups by a key with virtually unlimited scale and a flexible schema. Traffic is unpredictable. Which database should be chosen?",
    options: [
      { text: "Amazon DynamoDB with on-demand capacity", correct: true, why: "DynamoDB is a serverless key-value store with single-digit millisecond latency, and on-demand mode absorbs unpredictable traffic." },
      { text: "Amazon RDS for MySQL", correct: false, why: "A relational engine adds schema rigidity and vertical scaling limits this workload doesn't need." },
      { text: "Amazon Redshift", correct: false, why: "Redshift is a columnar analytics warehouse, not a low-latency operational key-value store." },
      { text: "Amazon Neptune", correct: false, why: "Neptune is a graph database for relationship traversal queries." },
    ],
  },
  {
    topic: "Databases",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A DynamoDB table holds session records that are only useful for 24 hours. Storage costs are climbing as old items accumulate. What is the most efficient solution?",
    options: [
      { text: "Enable DynamoDB TTL on an expiry timestamp attribute.", correct: true, why: "TTL deletes expired items automatically at no extra write cost, keeping the table lean." },
      { text: "Run a nightly Lambda scan-and-delete job.", correct: false, why: "Scans and deletes consume capacity and cost money to do what TTL does for free." },
      { text: "Reduce provisioned RCUs.", correct: false, why: "Read capacity is unrelated to storage growth from stale items." },
      { text: "Move the table to a cheaper Region.", correct: false, why: "Region pricing differences don't address unbounded data growth." },
    ],
  },
  {
    topic: "Databases",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An analytics team must query production RDS data but must never be able to modify it, and their queries must not affect production performance. What should the architect do?",
    options: [
      { text: "Create a read replica and grant the team read-only credentials to it.", correct: true, why: "A replica isolates analytics load from production, and read-only credentials prevent modification." },
      { text: "Grant the team read-only access to the primary instance.", correct: false, why: "Read-only prevents writes but heavy analytics queries would still degrade production performance." },
      { text: "Give the team the application's database credentials.", correct: false, why: "Sharing application credentials grants write access and destroys accountability." },
      { text: "Enable Multi-AZ and let the team query the standby.", correct: false, why: "The Multi-AZ standby is not accessible for queries." },
    ],
  },

  // ============================================================
  // Decoupling & Integration
  // ============================================================
  {
    topic: "Decoupling & Integration",
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
    topic: "Decoupling & Integration",
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
    topic: "Decoupling & Integration",
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
    topic: "Decoupling & Integration",
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
    topic: "Decoupling & Integration",
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
    topic: "Decoupling & Integration",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "When a photo is uploaded to S3, three independent services must each receive a copy of the notification and process it in parallel. What is the standard pattern?",
    options: [
      { text: "S3 event notification to an SNS topic, with an SQS queue subscribed for each service (fan-out).", correct: true, why: "SNS fan-out delivers each event to all subscribers, and per-service queues buffer work durably." },
      { text: "S3 event notification directly to one SQS queue read by all three services.", correct: false, why: "Only one consumer receives each SQS message, so the three services would split events, not each get one." },
      { text: "Have each service poll the bucket with ListObjects every minute.", correct: false, why: "Polling is slow, expensive at scale, and error prone compared to event notifications." },
      { text: "Enable S3 Cross-Region Replication to three buckets.", correct: false, why: "Replication copies data, it does not notify processing services." },
    ],
  },
  {
    topic: "Decoupling & Integration",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "Thousands of IoT sensors emit telemetry that must be ingested and processed in real time (sub-second) by multiple consumer applications, with the ability to replay the last 24 hours. Which service is designed for this?",
    options: [
      { text: "Amazon Kinesis Data Streams", correct: true, why: "Kinesis ingests streaming data at scale, lets multiple consumers read the same records, and retains them for replay." },
      { text: "Amazon SQS standard queue", correct: false, why: "Each SQS message is consumed by one consumer and deleted — no fan-out and no replay." },
      { text: "S3 with event notifications", correct: false, why: "S3 events work per uploaded object — batchy and higher latency than a stream." },
      { text: "AWS Batch", correct: false, why: "Batch schedules containerized batch jobs; it is not a real-time ingestion service." },
    ],
  },
  {
    topic: "Decoupling & Integration",
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
    topic: "Decoupling & Integration",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "Messages in an SQS queue are being processed more than once because the consumer sometimes takes longer than expected to finish. What is the most appropriate fix?",
    options: [
      { text: "Increase the visibility timeout to exceed the maximum processing time (or extend it while processing).", correct: true, why: "If the visibility timeout expires before deletion, the message becomes visible again and another consumer picks it up." },
      { text: "Increase the message retention period.", correct: false, why: "Retention governs how long unprocessed messages survive, not redelivery during processing." },
      { text: "Enable long polling.", correct: false, why: "Long polling reduces empty receives and cost; it has no effect on duplicate processing." },
      { text: "Switch to a larger consumer instance type.", correct: false, why: "Faster processing may mask the issue but the timeout mismatch remains the root cause." },
    ],
  },
  {
    topic: "Decoupling & Integration",
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
    topic: "Decoupling & Integration",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "An SQS consumer fleet generates a large number of empty ReceiveMessage responses, inflating request charges. What setting reduces this?",
    options: [
      { text: "Enable long polling by setting ReceiveMessageWaitTimeSeconds up to 20 seconds.", correct: true, why: "Long polling waits for messages to arrive instead of returning empty responses, cutting request count and cost." },
      { text: "Reduce the visibility timeout.", correct: false, why: "Visibility timeout affects redelivery, not empty receive volume." },
      { text: "Switch to a FIFO queue.", correct: false, why: "FIFO changes ordering semantics and costs more per request." },
      { text: "Increase the number of consumers.", correct: false, why: "More pollers produce more empty receives, increasing cost." },
    ],
  },

  // ============================================================
  // Analytics & Data Pipelines
  // ============================================================
  {
    topic: "Analytics & Data Pipelines",
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
    topic: "Analytics & Data Pipelines",
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
  {
    topic: "Analytics & Data Pipelines",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Athena query costs are high because every query scans entire CSV data sets in S3. Which change reduces cost the most?",
    options: [
      { text: "Convert the data to a columnar compressed format such as Parquet and partition it.", correct: true, why: "Athena bills per byte scanned; columnar formats plus partitioning can cut data scanned by an order of magnitude." },
      { text: "Increase the Athena query timeout.", correct: false, why: "Timeouts do not affect the volume of data scanned or the bill." },
      { text: "Move the bucket to a cheaper Region.", correct: false, why: "Storage price differences are minor next to per-query scan charges." },
      { text: "Enable S3 Transfer Acceleration on the bucket.", correct: false, why: "That is an upload performance feature and adds cost." },
    ],
  },
  {
    topic: "Analytics & Data Pipelines",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A company needs a petabyte-scale data warehouse for complex analytical SQL joins across historical business data, with BI tool integration. Which service is appropriate?",
    options: [
      { text: "Amazon Redshift", correct: true, why: "Redshift is the managed columnar MPP data warehouse designed for large-scale analytical queries and BI workloads." },
      { text: "Amazon DynamoDB", correct: false, why: "DynamoDB is a key-value store without the join and aggregation capability analytics requires." },
      { text: "Amazon RDS for MySQL", correct: false, why: "A row-oriented OLTP engine struggles with petabyte-scale analytical scans." },
      { text: "Amazon ElastiCache", correct: false, why: "ElastiCache is an in-memory cache, not a warehouse." },
    ],
  },
  {
    topic: "Analytics & Data Pipelines",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "An operations team needs to search and visualize application logs interactively, with dashboards and full-text queries over recent data. Which service is designed for this?",
    options: [
      { text: "Amazon OpenSearch Service", correct: true, why: "OpenSearch provides full-text search, log analytics, and dashboards over ingested log data." },
      { text: "Amazon Athena", correct: false, why: "Athena runs ad-hoc SQL over S3 but is not an interactive log search and dashboard tool." },
      { text: "Amazon QuickSight alone", correct: false, why: "QuickSight visualizes data from a source; it is not a log search engine itself." },
      { text: "AWS CloudTrail", correct: false, why: "CloudTrail records API activity; it is a log source, not a search platform." },
    ],
  },
  {
    topic: "Analytics & Data Pipelines",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A team must discover the schema of semi-structured files in S3 and build a searchable metadata catalog for Athena, without managing servers. Which service should be used?",
    options: [
      { text: "AWS Glue crawlers and the Glue Data Catalog", correct: true, why: "Glue crawlers infer schemas and populate the serverless Data Catalog that Athena and Redshift Spectrum query against." },
      { text: "Amazon EMR with a persistent Hive metastore", correct: false, why: "That means running and paying for cluster infrastructure Glue provides serverlessly." },
      { text: "Amazon Macie", correct: false, why: "Macie classifies sensitive data; it does not build a query metadata catalog." },
      { text: "AWS Config", correct: false, why: "Config catalogs AWS resource configurations, not data schemas." },
    ],
  },
  {
    topic: "Analytics & Data Pipelines",
    domain: "Design High-Performing Architectures",
    pick: 1,
    question:
      "A Kinesis Data Streams application is hitting ProvisionedThroughputExceededException errors during traffic peaks. What is the correct remedy?",
    options: [
      { text: "Increase the number of shards (or switch to on-demand capacity mode).", correct: true, why: "Stream throughput scales with shard count; each shard has fixed write/read limits." },
      { text: "Increase the data retention period.", correct: false, why: "Retention controls how long records are stored, not the ingest rate limit." },
      { text: "Add more consumer applications.", correct: false, why: "More consumers add read load, potentially worsening per-shard read limits." },
      { text: "Switch to Kinesis Data Firehose without changing anything else.", correct: false, why: "Firehose is a different service with different semantics — it is not a drop-in throughput fix for a Streams consumer app." },
    ],
  },

  // ============================================================
  // Migration & Transfer
  // ============================================================
  {
    topic: "Migration & Transfer",
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
    topic: "Migration & Transfer",
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
    topic: "Migration & Transfer",
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
    topic: "Migration & Transfer",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "A company wants to lift-and-shift 200 on-premises VMs to EC2 with minimal application changes and continuous replication so cutover downtime is short. Which service is designed for this?",
    options: [
      { text: "AWS Application Migration Service (MGN)", correct: true, why: "MGN continuously replicates source servers into AWS and converts them to run natively on EC2 at cutover." },
      { text: "AWS Database Migration Service (DMS)", correct: false, why: "DMS migrates databases, not whole servers." },
      { text: "AWS DataSync", correct: false, why: "DataSync moves files between storage systems; it does not rehost servers." },
      { text: "VM Import/Export run manually per VM", correct: false, why: "It can import images but lacks continuous replication, so downtime would be long across 200 VMs." },
    ],
  },
  {
    topic: "Migration & Transfer",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "External partners must upload files to the company's S3 bucket using SFTP with their existing SFTP clients, authenticated per partner. What should be used?",
    options: [
      { text: "AWS Transfer Family SFTP endpoint backed by S3", correct: true, why: "Transfer Family provides managed SFTP/FTPS/FTP access directly into S3 with per-user identity and no servers to run." },
      { text: "An EC2 instance running an SFTP daemon syncing to S3", correct: false, why: "That is a self-managed server to patch, scale, and secure — the managed service exists to avoid it." },
      { text: "Presigned S3 URLs emailed to partners", correct: false, why: "Presigned URLs work over HTTPS, not SFTP, and don't fit existing SFTP client workflows." },
      { text: "Making the bucket public for uploads", correct: false, why: "A publicly writable bucket is a severe security risk." },
    ],
  },
  {
    topic: "Migration & Transfer",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Before migrating, a company needs to inventory on-premises servers and gather CPU, memory, and network utilization data to right-size EC2 instances. Which service helps?",
    options: [
      { text: "AWS Application Discovery Service", correct: true, why: "Discovery Service collects on-premises server inventory and utilization data to plan and right-size a migration." },
      { text: "AWS Compute Optimizer", correct: false, why: "Compute Optimizer analyzes existing AWS resources, not on-premises servers." },
      { text: "AWS Trusted Advisor", correct: false, why: "Trusted Advisor reviews AWS account best practices, not on-premises inventory." },
      { text: "Amazon Inspector", correct: false, why: "Inspector is a vulnerability scanner." },
    ],
  },
  {
    topic: "Migration & Transfer",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "An on-premises backup process must write to durable cloud storage while keeping existing backup software that expects an iSCSI tape library. Which solution fits?",
    options: [
      { text: "AWS Storage Gateway — Tape Gateway (Virtual Tape Library)", correct: true, why: "Tape Gateway presents a virtual tape library over iSCSI and stores the tapes in S3 and Glacier." },
      { text: "Amazon S3 File Gateway", correct: false, why: "File Gateway presents NFS/SMB shares, which the tape-oriented backup software does not expect." },
      { text: "AWS DataSync", correct: false, why: "DataSync is a file transfer service and does not emulate a tape library." },
      { text: "Amazon EBS snapshots", correct: false, why: "EBS snapshots apply to AWS volumes, not to on-premises backup software." },
    ],
  },
  {
    topic: "Migration & Transfer",
    domain: "Design Cost-Optimized Architectures",
    pick: 2,
    question:
      "A company is planning a large migration and wants to reduce both the effort of choosing instance sizes after migration and the ongoing cost of over-provisioned resources. Which TWO AWS tools support this?",
    options: [
      { text: "AWS Compute Optimizer for right-sizing recommendations on running resources.", correct: true, why: "Compute Optimizer analyzes utilization metrics and recommends better-fitting instance types." },
      { text: "AWS Cost Explorer rightsizing recommendations.", correct: true, why: "Cost Explorer surfaces idle and underutilized instances with specific downsizing suggestions and savings estimates." },
      { text: "AWS Shield Advanced.", correct: false, why: "Shield is DDoS protection with no cost or sizing role." },
      { text: "Amazon Macie.", correct: false, why: "Macie classifies sensitive data and has no sizing function." },
    ],
  },

  // ============================================================
  // Cost Management & Governance
  // ============================================================
  {
    topic: "Cost Management & Governance",
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
    topic: "Cost Management & Governance",
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
    topic: "Cost Management & Governance",
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
    topic: "Cost Management & Governance",
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
    topic: "Cost Management & Governance",
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
  {
    topic: "Cost Management & Governance",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "A company with 30 AWS accounts wants volume pricing tiers applied across all accounts and a single monthly bill. What should be configured?",
    options: [
      { text: "AWS Organizations with consolidated billing.", correct: true, why: "Consolidated billing aggregates usage so all accounts share volume discounts and RI/Savings Plans benefits under one bill." },
      { text: "A separate Savings Plan purchased in each account.", correct: false, why: "Fragmenting commitments per account forfeits the aggregation benefit consolidated billing provides." },
      { text: "Cost allocation tags alone.", correct: false, why: "Tags attribute cost for reporting; they do not merge billing or pool discounts." },
      { text: "One shared IAM user across all accounts.", correct: false, why: "That is a security anti-pattern and unrelated to billing." },
    ],
  },
  {
    topic: "Cost Management & Governance",
    domain: "Design Cost-Optimized Architectures",
    pick: 1,
    question:
      "Management asks which team is responsible for each dollar of AWS spend. Resources are spread across many services. What is the standard approach?",
    options: [
      { text: "Apply a consistent tagging strategy and activate cost allocation tags for reporting.", correct: true, why: "Cost allocation tags let Cost Explorer and billing reports break down spend by team, project, or environment." },
      { text: "Create a separate AWS account per engineer.", correct: false, why: "Account sprawl is a heavy-handed substitute for tagging and adds real management overhead." },
      { text: "Review CloudTrail logs monthly.", correct: false, why: "CloudTrail shows who called APIs, not what each team spends." },
      { text: "Enable Trusted Advisor.", correct: false, why: "Trusted Advisor gives optimization checks, not per-team cost attribution." },
    ],
  },
  {
    topic: "Cost Management & Governance",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "An auditor asks for a complete record of who made every configuration change in an AWS account over the last year, including the source IP. What must be in place?",
    options: [
      { text: "AWS CloudTrail with a multi-Region trail delivering logs to S3.", correct: true, why: "CloudTrail records every API call with identity, time, source IP, and parameters — the account's audit log." },
      { text: "Amazon CloudWatch metrics with 1-year retention.", correct: false, why: "Metrics are numeric performance data with no record of who did what." },
      { text: "VPC Flow Logs.", correct: false, why: "Flow Logs capture network traffic metadata, not configuration changes." },
      { text: "AWS Config alone.", correct: false, why: "Config tracks resource state over time but CloudTrail is the service that records the caller identity for every API action." },
    ],
  },
  {
    topic: "Cost Management & Governance",
    domain: "Design Secure Architectures",
    pick: 1,
    question:
      "A compliance policy states that every EBS volume must be encrypted. The team needs continuous detection of non-compliant volumes and automatic remediation. Which service combination is appropriate?",
    options: [
      { text: "AWS Config rules with automatic remediation actions.", correct: true, why: "Config continuously evaluates resources against rules and can trigger SSM Automation documents to remediate." },
      { text: "Amazon Inspector with weekly scans.", correct: false, why: "Inspector finds software vulnerabilities, not resource configuration compliance." },
      { text: "AWS CloudTrail alarms.", correct: false, why: "CloudTrail records the API calls but does not evaluate ongoing resource compliance state." },
      { text: "Trusted Advisor cost checks.", correct: false, why: "Wrong category entirely — those checks target spend, not encryption compliance." },
    ],
  },
  {
    topic: "Cost Management & Governance",
    domain: "Design Resilient Architectures",
    pick: 1,
    question:
      "An operations team needs a single, centrally managed backup policy covering EBS volumes, RDS databases, DynamoDB tables, and EFS file systems, with retention rules and cross-Region copies. What should they use?",
    options: [
      { text: "AWS Backup with backup plans applied via tags.", correct: true, why: "AWS Backup centralizes policy-driven backup, retention, and cross-Region copy across many AWS services." },
      { text: "Per-service scripts triggered by EventBridge.", correct: false, why: "Custom scripts per service duplicate what AWS Backup manages centrally and are harder to audit." },
      { text: "EBS snapshot lifecycle policies only.", correct: false, why: "Data Lifecycle Manager covers EBS snapshots but not RDS, DynamoDB, or EFS." },
      { text: "S3 Cross-Region Replication.", correct: false, why: "CRR replicates S3 objects and does not back up databases or volumes." },
    ],
  },
];
