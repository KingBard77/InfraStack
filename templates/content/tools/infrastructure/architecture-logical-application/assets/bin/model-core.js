const ArchitectureLogicalApplicationModelCore = (function () {
    const toolId = 'architecture-logical-application';
    const toolVersion = '1.0.0';
    const allowedDetailLevels = ['executive', 'component', 'service'];
    const allowedFlowDepths = ['summary', 'standard', 'expanded'];
    const listControlKeys = [
        'usersActors',
        'frontendComponents',
        'backendServices',
        'databases',
        'cacheStorage',
        'externalIntegrations',
        'authenticationMethod',
        'notifications',
        'monitoringLogging'
    ];

    const presetCatalog = [
        {
            id: 'web-application',
            label: 'Web Application',
            description: 'Web portal, API gateway, application services, database, cache, notifications, monitoring, and identity controls.',
            prompt: 'Create a customer web application for account registration, profile updates, approvals, notifications, and reporting. Users are Customer, Admin, Support Officer, and Partner API. Include Web Portal, Admin Portal, Public API Consumer, API Gateway, Authentication Service, User Service, Approval Service, Notification Service, Reporting Service, PostgreSQL, Redis, Object Storage, Email, SMS, OAuth2, MFA, Grafana, Prometheus, ELK, and a registration-to-approval business flow.',
            defaults: {
                detailLevel: 'component',
                flowDepth: 'standard',
                applicationName: 'Customer Web Portal',
                businessPurpose: 'Allow customers to register, manage profiles, request approvals, receive notifications, and review status dashboards.',
                usersActors: 'Customer, Admin, Support Officer, Partner API',
                frontendComponents: 'Web Portal, Admin Portal, Public API Consumer',
                backendServices: 'API Gateway, Authentication Service, User Service, Approval Service, Notification Service, Reporting Service',
                databases: 'PostgreSQL, Reporting Database',
                cacheStorage: 'Redis, Object Storage, File Storage',
                externalIntegrations: 'Payment Gateway, SMS Gateway, Email Service, Partner CRM',
                authenticationMethod: 'OAuth2, OpenID Connect, MFA',
                notifications: 'Email, SMS, Push Notification',
                monitoringLogging: 'Grafana, Prometheus, ELK, APM',
                businessFlow: 'Customer registers through the web portal. Authentication verifies identity. User service stores profile data. Approval service routes the request to an officer. Notification service sends status updates. Reporting service updates the dashboard.'
            }
        },
        {
            id: 'mobile-application',
            label: 'Mobile Application',
            description: 'Mobile app, API gateway, backend services, push notifications, profile data, object storage, and analytics.',
            prompt: 'Design a mobile application for iOS and Android users. Include Mobile App, API Gateway, Authentication Service, Profile Service, Transaction Service, Notification Service, Analytics Service, PostgreSQL, Redis, Object Storage, Push Notification, Email, SMS, OAuth2, OpenID Connect, MFA, Grafana, Prometheus, and a sign-in-to-transaction business flow.',
            defaults: {
                detailLevel: 'component',
                flowDepth: 'standard',
                applicationName: 'Mobile Service App',
                businessPurpose: 'Provide mobile self-service access for profiles, transactions, notifications, and support status.',
                usersActors: 'Mobile User, Admin, Support Agent, Partner API',
                frontendComponents: 'Mobile App, Admin Portal, API Consumer',
                backendServices: 'API Gateway, Authentication Service, Profile Service, Transaction Service, Notification Service, Analytics Service',
                databases: 'PostgreSQL, MongoDB',
                cacheStorage: 'Redis, Object Storage',
                externalIntegrations: 'Push Notification Provider, SMS Gateway, Email Service, Payment Gateway',
                authenticationMethod: 'OAuth2, OpenID Connect, MFA, Device Trust',
                notifications: 'Push Notification, Email, SMS',
                monitoringLogging: 'Grafana, Prometheus, ELK, Mobile Analytics',
                businessFlow: 'User signs in from the mobile app. API gateway routes the request. Services process profile and transaction changes. Data is persisted. Notification provider sends status updates. Analytics records usage events.'
            }
        },
        {
            id: 'microservices',
            label: 'Microservices',
            description: 'Client app, API gateway, multiple services, message broker, per-service data stores, cache, and observability.',
            prompt: 'Create a microservices architecture with Client App, API Gateway or BFF, User Service, Order Service, Payment Service, Notification Service, Kafka or RabbitMQ, PostgreSQL per service, Redis, Object Storage, OAuth2, OpenID Connect, Email, SMS, Grafana, Prometheus, ELK, tracing, and an order placement business flow.',
            defaults: {
                detailLevel: 'service',
                flowDepth: 'expanded',
                applicationName: 'Order Microservices Platform',
                businessPurpose: 'Coordinate user, order, payment, fulfillment, and notification workflows through independently deployable services.',
                usersActors: 'Customer, Admin, Partner API, External Payment System',
                frontendComponents: 'Client Web App, Mobile App, API Consumer',
                backendServices: 'API Gateway, User Service, Order Service, Payment Service, Inventory Service, Notification Service',
                databases: 'User Database, Order Database, Payment Database, Inventory Database',
                cacheStorage: 'Redis, Object Storage',
                externalIntegrations: 'Payment Gateway, Email Service, SMS Gateway, Logistics API',
                authenticationMethod: 'OAuth2, OpenID Connect, Service Tokens, MFA',
                notifications: 'Email, SMS, Push Notification',
                monitoringLogging: 'Grafana, Prometheus, ELK, Distributed Tracing, APM',
                businessFlow: 'Customer places an order. API gateway calls order service. Order service checks inventory. Payment service confirms payment. Event broker publishes order status. Notification service informs the customer.'
            }
        },
        {
            id: 'enterprise-application',
            label: 'Enterprise Application',
            description: 'Enterprise portal, integration layer, ERP/CRM/HRMS services, warehouse data, SSO, audit, and monitoring.',
            prompt: 'Design an enterprise application with Users and Employees, Enterprise Portal, Integration Layer or ESB, ERP System, CRM System, HRMS System, Reporting Service, Enterprise Database, Data Warehouse, Active Directory SSO, MFA, Email, Teams, Grafana, Splunk, and employee request workflow.',
            defaults: {
                detailLevel: 'component',
                flowDepth: 'standard',
                applicationName: 'Enterprise Operations Portal',
                businessPurpose: 'Unify employee workflows, approvals, reporting, and integrations across enterprise systems.',
                usersActors: 'Employee, Manager, HR Officer, Finance Officer, System Admin',
                frontendComponents: 'Enterprise Portal, Admin Portal, Dashboard',
                backendServices: 'Integration Layer, Approval Service, Reporting Service, ERP Adapter, CRM Adapter, HRMS Adapter',
                databases: 'Enterprise Database, Data Warehouse',
                cacheStorage: 'Redis, File Storage',
                externalIntegrations: 'ERP System, CRM System, HRMS System, Email Service, Teams Webhook',
                authenticationMethod: 'SSO, OpenID Connect, Active Directory, MFA',
                notifications: 'Email, Teams, SMS',
                monitoringLogging: 'Splunk, Grafana, Prometheus, APM',
                businessFlow: 'Employee submits a request. Portal sends it to approval service. Integration layer synchronizes ERP, CRM, and HRMS data. Manager approves. Reporting service updates enterprise dashboards.'
            }
        },
        {
            id: 'government-application',
            label: 'Government Application',
            description: 'Citizen portal, verification, approval, certificate, records database, SSO/MFA, notifications, and audit logging.',
            prompt: 'Create a government application for citizen services. Include Citizen, Officer, Admin, External Agency, Government Portal, Authentication Service, Verification Service, Approval Service, Certificate Service, Notification Service, Government Database, Document Storage, Government API, SSO, MFA, Email, SMS, WhatsApp, Grafana, Prometheus, ELK, audit logging, and an application-to-certificate flow.',
            defaults: {
                detailLevel: 'component',
                flowDepth: 'expanded',
                applicationName: 'Citizen Service Portal',
                businessPurpose: 'Allow citizens to submit requests, verify eligibility, receive approvals, and download certificates or status updates.',
                usersActors: 'Citizen, Officer, Admin, External Agency',
                frontendComponents: 'Government Portal, Officer Dashboard, Admin Portal',
                backendServices: 'Authentication Service, Verification Service, Approval Service, Certificate Service, Notification Service, Audit Service',
                databases: 'Government Database, Citizen Records Database',
                cacheStorage: 'Object Storage, File Storage',
                externalIntegrations: 'Government API, National ID Service, SMS Gateway, Email Service',
                authenticationMethod: 'SSO, OpenID Connect, MFA',
                notifications: 'Email, SMS, WhatsApp',
                monitoringLogging: 'Grafana, Prometheus, ELK, Audit Logging',
                businessFlow: 'Citizen submits an application. Authentication validates identity. Verification service checks records. Officer reviews and approves. Certificate service generates output. Notification service sends status to the citizen.'
            }
        },
        {
            id: 'ai-ml-application',
            label: 'AI/ML Application',
            description: 'AI portal, orchestration, LLM service, RAG service, inference service, vector store, model storage, and observability.',
            prompt: 'Design an AI/ML application with Users, AI Chat Portal, AI Orchestrator Service, LLM Service, RAG Service, ML Inference Service, Vector Database, Knowledge Base, Model Storage, API Gateway, OAuth2, MFA, Email, Grafana, Prometheus, tracing, APM, and a prompt-to-response business flow.',
            defaults: {
                detailLevel: 'service',
                flowDepth: 'expanded',
                applicationName: 'AI Knowledge Assistant',
                businessPurpose: 'Provide guided AI responses from approved knowledge sources, retrieval workflows, and model inference services.',
                usersActors: 'User, Admin, Knowledge Manager, External Model API',
                frontendComponents: 'AI Chat Portal, Admin Dashboard, API Consumer',
                backendServices: 'API Gateway, AI Orchestrator Service, LLM Service, RAG Service, ML Inference Service, Guardrail Service',
                databases: 'Vector Database, Metadata Database',
                cacheStorage: 'Knowledge Base, Object Storage, Model Storage',
                externalIntegrations: 'External LLM API, Document Repository, Email Service',
                authenticationMethod: 'OAuth2, OpenID Connect, MFA',
                notifications: 'Email, In-App Notification',
                monitoringLogging: 'Grafana, Prometheus, ELK, Tracing, APM',
                businessFlow: 'User submits a prompt. Orchestrator authenticates and applies guardrails. RAG service retrieves context. LLM service generates a response. Audit and monitoring capture the request path.'
            }
        },
        {
            id: 'event-driven-application',
            label: 'Event-Driven Application',
            description: 'Producer services, event streaming platform, consumer services, read models, cache, search, notifications, and monitoring.',
            prompt: 'Create an event-driven application with Users, Producer Services, Event Streaming Platform, Kafka or Event Hub, Consumer Service A, Consumer Service B, Consumer Service C, PostgreSQL, Redis, Elasticsearch, Email, SMS, OAuth2, Grafana, Prometheus, ELK, and a publish-subscribe business flow.',
            defaults: {
                detailLevel: 'service',
                flowDepth: 'expanded',
                applicationName: 'Event Processing Platform',
                businessPurpose: 'Process business events asynchronously so multiple consumers can react, update data stores, and trigger notifications.',
                usersActors: 'User, External System, Admin, Partner API',
                frontendComponents: 'Producer Portal, Admin Dashboard, API Consumer',
                backendServices: 'API Gateway, Producer Service, Event Broker, Consumer Service A, Consumer Service B, Consumer Service C',
                databases: 'PostgreSQL, Search Index',
                cacheStorage: 'Redis, Object Storage',
                externalIntegrations: 'Kafka, Event Hub, Email Service, SMS Gateway',
                authenticationMethod: 'OAuth2, OpenID Connect, Service Tokens',
                notifications: 'Email, SMS, Webhook',
                monitoringLogging: 'Grafana, Prometheus, ELK, Event Lag Monitoring',
                businessFlow: 'Producer service publishes an event. Broker stores and routes the event. Consumer services process it independently. Databases and search indexes update. Notification channels publish status.'
            }
        },
        {
            id: 'data-processing-pipeline',
            label: 'Data Processing Pipeline',
            description: 'Data sources, ingestion, processing, lake, warehouse, analytics, workflow scheduling, and observability.',
            prompt: 'Design a data processing pipeline with Data Sources, Ingestion Layer, Batch and Stream Processing, ETL Transform, Data Lake, Data Warehouse, Analytics and BI, Scheduler, Metadata Store, Object Storage, API Sources, OAuth2, Grafana, Prometheus, ELK, and source-to-dashboard flow.',
            defaults: {
                detailLevel: 'component',
                flowDepth: 'expanded',
                applicationName: 'Analytics Data Pipeline',
                businessPurpose: 'Ingest, transform, store, and publish trusted data for analytics, reporting, and operational dashboards.',
                usersActors: 'Data Analyst, Data Engineer, Business User, External Data Source',
                frontendComponents: 'BI Dashboard, Data Portal, API Consumer',
                backendServices: 'Ingestion Service, Batch Processor, Stream Processor, ETL Service, Analytics Service, Scheduler',
                databases: 'Data Warehouse, Metadata Database',
                cacheStorage: 'Data Lake, Object Storage',
                externalIntegrations: 'API Sources, File Drop, Message Queue, Reporting Tool',
                authenticationMethod: 'OAuth2, Service Account, MFA',
                notifications: 'Email, Teams, Alert Webhook',
                monitoringLogging: 'Grafana, Prometheus, ELK, Pipeline Monitoring',
                businessFlow: 'Data arrives from sources. Ingestion validates and stores raw data. Processing layer transforms records. Data lake keeps raw data. Warehouse stores curated data. Analytics dashboards publish reports.'
            }
        },
        {
            id: 'identity-access-management',
            label: 'Identity & Access Management',
            description: 'Users, identity provider, SSO/OIDC, MFA, application relying parties, audit logging, and policy services.',
            prompt: 'Create an identity and access management architecture with Users, Identity Provider, SSO, OpenID Connect, OAuth2, MFA Service, Directory Service, Policy Service, Application A, Application B, Application C, Audit Logging Service, LDAP, Active Directory, Email, SMS, Grafana, Prometheus, and sign-in flow.',
            defaults: {
                detailLevel: 'service',
                flowDepth: 'expanded',
                applicationName: 'Identity Access Platform',
                businessPurpose: 'Centralize sign-in, federation, MFA, access policy, and audit logging for multiple applications.',
                usersActors: 'User, Admin, Application Owner, External Identity Provider',
                frontendComponents: 'Login Portal, Admin Portal, Application Clients',
                backendServices: 'Identity Provider, MFA Service, Directory Service, Policy Service, Audit Logging Service',
                databases: 'Identity Store, Audit Database',
                cacheStorage: 'Session Cache, Key Store',
                externalIntegrations: 'LDAP, Active Directory, External IdP, Email Service, SMS Gateway',
                authenticationMethod: 'SSO, OAuth2, OpenID Connect, LDAP, Active Directory, MFA',
                notifications: 'Email, SMS, Push Notification',
                monitoringLogging: 'Grafana, Prometheus, ELK, SIEM',
                businessFlow: 'User signs in through the identity provider. MFA verifies the session. Policy service evaluates access. Application receives tokens. Audit logging records the sign-in and access decision.'
            }
        },
        {
            id: 'service-dependency-map',
            label: 'Service Dependency Map',
            description: 'Frontend, API gateway, service dependencies, synchronous calls, asynchronous calls, shared database, and impact paths.',
            prompt: 'Create a service dependency map with Frontend Client, API Gateway, User Service, Order Service, Payment Service, Inventory Service, Notification Service, Shared Database Service, Message Broker, OAuth2, Grafana, Prometheus, ELK, tracing, and request dependency paths.',
            defaults: {
                detailLevel: 'service',
                flowDepth: 'expanded',
                applicationName: 'Service Dependency Map',
                businessPurpose: 'Show how application services depend on each other for impact analysis, change planning, and incident review.',
                usersActors: 'User, API Consumer, Admin',
                frontendComponents: 'Frontend Client, API Gateway',
                backendServices: 'User Service, Order Service, Payment Service, Inventory Service, Notification Service, Database Service',
                databases: 'Shared Database, Service Databases',
                cacheStorage: 'Redis, Message Broker',
                externalIntegrations: 'Payment Provider, Email Service, SMS Gateway',
                authenticationMethod: 'OAuth2, OpenID Connect, Service Tokens',
                notifications: 'Email, SMS, Webhook',
                monitoringLogging: 'Grafana, Prometheus, ELK, Distributed Tracing',
                businessFlow: 'Frontend calls API gateway. Gateway routes to user, order, and payment services. Services read and write data. Inventory and notification services receive asynchronous events. Monitoring traces the dependency path.'
            }
        }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeText(value) {
        return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function normalizeFreeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeEnum(value, fallback, allowedValues) {
        const normalized = normalizeText(value);

        if (allowedValues.includes(normalized)) {
            return normalized;
        }

        return allowedValues.includes(fallback) ? fallback : allowedValues[0];
    }

    function getPreset(presetId) {
        return presetCatalog.find(function (preset) {
            return preset.id === presetId;
        }) || presetCatalog[0];
    }

    function splitList(value) {
        const text = String(value || '').trim();

        if (!text) {
            return [];
        }

        return text.split(/\n|,|;/).map(function (item) {
            return item.replace(/^\d+[\).\s-]+/, '').trim();
        }).filter(Boolean);
    }

    function compactList(items, fallback, limit) {
        const values = Array.isArray(items) ? items : splitList(items);
        const count = Number.isInteger(limit) ? limit : 4;
        const selected = values.slice(0, count);

        return selected.length ? selected.join(', ') : fallback;
    }

    function labelFromMap(value, fallback, map) {
        return map[value] || fallback;
    }

    function detailLevelLabel(value) {
        return labelFromMap(value, 'Component', {
            executive: 'Executive',
            component: 'Component',
            service: 'Service detail'
        });
    }

    function flowDepthLabel(value) {
        return labelFromMap(value, 'Standard', {
            summary: 'Summary',
            standard: 'Standard',
            expanded: 'Expanded'
        });
    }

    function listTone(items, strongThreshold, fairThreshold) {
        const count = Array.isArray(items) ? items.length : 0;

        if (count >= strongThreshold) {
            return 'excellent';
        }

        return count >= fairThreshold ? 'good' : 'fair';
    }

    function includesAny(text, terms) {
        return terms.some(function (term) {
            return text.includes(term);
        });
    }

    function extractLabeledValue(promptText, labels) {
        const prompt = String(promptText || '');

        for (let index = 0; index < labels.length; index += 1) {
            const label = labels[index].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const expression = new RegExp(label + '\\s*:\\s*([^\\n]+)', 'i');
            const match = prompt.match(expression);

            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return '';
    }

    function detectKeywords(promptText) {
        const text = normalizeText(promptText);
        const pairs = [
            ['Actors', ['customer', 'citizen', 'admin', 'officer', 'partner', 'employee', 'user']],
            ['Frontend', ['web portal', 'mobile app', 'dashboard', 'admin portal', 'frontend']],
            ['API gateway', ['api gateway', 'bff', 'api consumer']],
            ['Backend services', ['service', 'microservice', 'approval', 'notification', 'reporting']],
            ['Database', ['postgresql', 'mysql', 'mongodb', 'oracle', 'database', 'warehouse']],
            ['Cache / storage', ['redis', 'cache', 'object storage', 'file storage', 'nas']],
            ['External integration', ['payment', 'sms gateway', 'email service', 'government api', 'third-party', 'partner']],
            ['Identity', ['sso', 'oauth', 'openid', 'ldap', 'freeipa', 'active directory', 'mfa']],
            ['Notifications', ['email', 'sms', 'push', 'whatsapp', 'telegram']],
            ['Monitoring', ['grafana', 'prometheus', 'elk', 'splunk', 'apm', 'logging', 'monitoring']]
        ];

        return pairs.filter(function (pair) {
            return includesAny(text, pair[1]);
        }).map(function (pair) {
            return pair[0];
        });
    }

    function inferFromPrompt(promptText, defaults) {
        const text = normalizeText(promptText);
        const inferred = {};
        const assumptions = [];
        const matchedKeywords = detectKeywords(promptText);
        const labelledFields = {
            applicationName: ['Application Name', 'Application'],
            businessPurpose: ['Business Purpose', 'Purpose'],
            usersActors: ['Users / Actors', 'Users', 'Actors'],
            frontendComponents: ['Frontend Components', 'Frontend'],
            backendServices: ['Backend Services', 'Services'],
            databases: ['Databases', 'Database'],
            cacheStorage: ['Cache / Storage', 'Storage', 'Cache'],
            externalIntegrations: ['External Integrations', 'Integrations'],
            authenticationMethod: ['Authentication Method', 'Authentication', 'Auth'],
            notifications: ['Notifications', 'Notification'],
            monitoringLogging: ['Monitoring & Logging', 'Monitoring', 'Logging'],
            businessFlow: ['Business Flow', 'Flow']
        };

        Object.keys(labelledFields).forEach(function (key) {
            const value = extractLabeledValue(promptText, labelledFields[key]);

            if (value) {
                inferred[key] = value;
            }
        });

        if (includesAny(text, ['executive summary', 'high level', 'high-level'])) {
            inferred.detailLevel = 'executive';
        } else if (includesAny(text, ['service detail', 'microservice', 'dependency map'])) {
            inferred.detailLevel = 'service';
        }

        if (includesAny(text, ['step by step', 'end-to-end', 'expanded flow', 'sequence'])) {
            inferred.flowDepth = 'expanded';
        } else if (includesAny(text, ['summary flow', 'simple flow'])) {
            inferred.flowDepth = 'summary';
        }

        if (!matchedKeywords.length) {
            assumptions.push('Prompt did not include recognized application architecture keywords; preset defaults shaped the model.');
        }

        listControlKeys.forEach(function (key) {
            if (!inferred[key] && !splitList(defaults[key]).length) {
                assumptions.push(key + ' was not explicit, so the preset value was used.');
            }
        });

        return {
            inferred,
            assumptions,
            matchedKeywords
        };
    }

    function normalizeControls(rawControls, defaults) {
        const controls = {};

        controls.detailLevel = normalizeEnum(rawControls.detailLevel, defaults.detailLevel, allowedDetailLevels);
        controls.flowDepth = normalizeEnum(rawControls.flowDepth, defaults.flowDepth, allowedFlowDepths);
        controls.applicationName = normalizeFreeText(rawControls.applicationName, defaults.applicationName);
        controls.businessPurpose = normalizeFreeText(rawControls.businessPurpose, defaults.businessPurpose);
        controls.businessFlow = normalizeFreeText(rawControls.businessFlow, defaults.businessFlow);
        listControlKeys.forEach(function (key) {
            controls[key] = normalizeFreeText(rawControls[key], defaults[key]);
        });

        return controls;
    }

    function mergeControlsWithPrompt(promptText, preset, rawControls) {
        const defaults = clone(preset.defaults);
        const promptResult = inferFromPrompt(promptText, defaults);
        const merged = Object.assign({}, defaults, promptResult.inferred, rawControls || {});

        return {
            controls: normalizeControls(merged, defaults),
            assumptions: promptResult.assumptions,
            matchedKeywords: promptResult.matchedKeywords
        };
    }

    function buildLists(controls) {
        return {
            usersActors: splitList(controls.usersActors),
            frontendComponents: splitList(controls.frontendComponents),
            backendServices: splitList(controls.backendServices),
            databases: splitList(controls.databases),
            cacheStorage: splitList(controls.cacheStorage),
            externalIntegrations: splitList(controls.externalIntegrations),
            authenticationMethod: splitList(controls.authenticationMethod),
            notifications: splitList(controls.notifications),
            monitoringLogging: splitList(controls.monitoringLogging),
            businessFlow: splitList(controls.businessFlow.replace(/\.\s+/g, '\n'))
        };
    }

    function buildInventory(model) {
        const controls = model.controls;
        const lists = model.lists;

        return [
            {
                id: '01',
                component: 'Users / Actors',
                placement: compactList(lists.usersActors, 'Application actors', 4),
                purpose: 'Shows who initiates, approves, administers, consumes, or integrates with the application.',
                action: 'Confirm each actor has a defined channel, trust boundary, and ownership.'
            },
            {
                id: '02',
                component: 'Frontend Components',
                placement: compactList(lists.frontendComponents, 'User-facing channels', 4),
                purpose: 'Represents portals, mobile apps, dashboards, admin surfaces, and API consumers.',
                action: 'Confirm entry points, channel ownership, and public versus internal access.'
            },
            {
                id: '03',
                component: 'API / Access Layer',
                placement: 'Between frontend and services',
                purpose: 'Normalizes request routing, throttling, mediation, and service access.',
                action: 'Confirm API gateway, BFF, routing, rate limits, and error behavior.'
            },
            {
                id: '04',
                component: 'Backend Services',
                placement: compactList(lists.backendServices, 'Application service layer', 5),
                purpose: 'Owns business capabilities and coordinates application workflow.',
                action: 'Confirm service boundaries, dependencies, ownership, and failure behavior.'
            },
            {
                id: '05',
                component: 'Databases',
                placement: compactList(lists.databases, 'Persistent data stores', 4),
                purpose: 'Stores transactional, document, reporting, or analytical application data.',
                action: 'Review data ownership, retention, replication, and access paths.'
            },
            {
                id: '06',
                component: 'Cache / Storage',
                placement: compactList(lists.cacheStorage, 'Cache, object, or file layer', 4),
                purpose: 'Supports cache acceleration, document storage, object retention, or file exchange.',
                action: 'Confirm cache invalidation, storage lifecycle, and data classification.'
            },
            {
                id: '07',
                component: 'External Integrations',
                placement: compactList(lists.externalIntegrations, 'External systems', 4),
                purpose: 'Represents payment, messaging, agency, partner, or third-party dependencies.',
                action: 'Confirm contracts, retries, timeout, credential, and audit requirements.'
            },
            {
                id: '08',
                component: 'Authentication Method',
                placement: compactList(lists.authenticationMethod, 'Identity boundary', 4),
                purpose: 'Models the sign-in, federation, directory, MFA, or service-token path.',
                action: 'Review token flow, session lifecycle, MFA, and privileged access.'
            },
            {
                id: '09',
                component: 'Notifications',
                placement: compactList(lists.notifications, 'Outbound communication channels', 4),
                purpose: 'Shows user-facing status, alert, and transactional communication paths.',
                action: 'Confirm templates, consent, retry, fallback, and audit handling.'
            },
            {
                id: '10',
                component: 'Monitoring & Logging',
                placement: compactList(lists.monitoringLogging, 'Observability layer', 4),
                purpose: 'Captures application health, metrics, logs, traces, dashboards, and alerts.',
                action: 'Confirm telemetry scope, retention, alert routing, and incident ownership.'
            },
            {
                id: '11',
                component: 'Business Flow',
                placement: flowDepthLabel(controls.flowDepth),
                purpose: controls.businessFlow,
                action: 'Validate the flow with business owners and implementation teams.'
            }
        ];
    }

    function buildRouteRows(model) {
        const lists = model.lists;

        return [
            ['User journey', compactList(lists.usersActors, 'User', 2) + ' -> ' + compactList(lists.frontendComponents, 'Frontend', 2) + ' -> API / access layer -> ' + compactList(lists.backendServices, 'Backend services', 3)],
            ['Authentication path', compactList(lists.frontendComponents, 'Frontend', 2) + ' -> ' + compactList(lists.authenticationMethod, 'Identity provider', 3) + ' -> application session'],
            ['Data path', compactList(lists.backendServices, 'Services', 3) + ' -> ' + compactList(lists.databases, 'Database', 3) + ' / ' + compactList(lists.cacheStorage, 'Cache or storage', 3)],
            ['Integration path', compactList(lists.backendServices, 'Services', 3) + ' -> ' + compactList(lists.externalIntegrations, 'External integrations', 4)],
            ['Notification path', compactList(lists.backendServices, 'Services', 3) + ' -> ' + compactList(lists.notifications, 'Notification channels', 4)],
            ['Observability path', compactList(lists.backendServices, 'Services', 3) + ' -> ' + compactList(lists.monitoringLogging, 'Monitoring and logging', 4)]
        ];
    }

    function buildControlRows(model) {
        const controls = model.controls;
        const lists = model.lists;

        return [
            ['Application name', controls.applicationName],
            ['Business purpose', controls.businessPurpose],
            ['Preset', model.presetLabel],
            ['Detail level', detailLevelLabel(controls.detailLevel)],
            ['Flow focus', flowDepthLabel(controls.flowDepth)],
            ['Primary actors', compactList(lists.usersActors, 'Not specified', 5)],
            ['Primary services', compactList(lists.backendServices, 'Not specified', 5)],
            ['Data stores', compactList(lists.databases.concat(lists.cacheStorage), 'Not specified', 5)],
            ['Identity', compactList(lists.authenticationMethod, 'Not specified', 5)],
            ['Observability', compactList(lists.monitoringLogging, 'Not specified', 5)]
        ];
    }

    function buildPillars(model) {
        const lists = model.lists;
        const controls = model.controls;
        const functionalScore = 46 + Math.min(28, (lists.frontendComponents.length + lists.backendServices.length) * 4) + (controls.businessPurpose ? 12 : 0) + (lists.businessFlow.length ? 10 : 0);
        const integrationScore = 44 + Math.min(20, lists.externalIntegrations.length * 5) + Math.min(16, lists.notifications.length * 4) + Math.min(20, lists.authenticationMethod.length * 5);
        const dataScore = 46 + Math.min(24, lists.databases.length * 8) + Math.min(18, lists.cacheStorage.length * 6) + (controls.flowDepth === 'expanded' ? 8 : 0);
        const operationsScore = 44 + Math.min(32, lists.monitoringLogging.length * 8) + (controls.detailLevel === 'service' ? 12 : 0) + (lists.businessFlow.length >= 4 ? 8 : 0);

        return [
            {
                label: 'Functional model',
                score: Math.min(100, functionalScore),
                tone: functionalScore >= 82 ? 'excellent' : 'good',
                icon: 'bi bi-window-stack'
            },
            {
                label: 'Identity and integration',
                score: Math.min(100, integrationScore),
                tone: listTone(lists.externalIntegrations.concat(lists.authenticationMethod), 4, 2),
                icon: 'bi bi-shield-lock'
            },
            {
                label: 'Data and storage',
                score: Math.min(100, dataScore),
                tone: dataScore >= 82 ? 'excellent' : (dataScore >= 66 ? 'good' : 'fair'),
                icon: 'bi bi-database'
            },
            {
                label: 'Operations visibility',
                score: Math.min(100, operationsScore),
                tone: operationsScore >= 82 ? 'excellent' : (operationsScore >= 66 ? 'good' : 'fair'),
                icon: 'bi bi-activity'
            }
        ];
    }

    function buildRisk(model, score) {
        const lists = model.lists;
        const reviewPoints = [];

        if (!lists.usersActors.length) {
            reviewPoints.push('Users or actors are not explicit, so access and ownership paths need review.');
        }

        if (!lists.backendServices.length) {
            reviewPoints.push('Backend services are not explicit, so service responsibility boundaries need review.');
        }

        if (!lists.databases.length) {
            reviewPoints.push('Persistent data stores are not explicit.');
        }

        if (!lists.authenticationMethod.length) {
            reviewPoints.push('Authentication method is not explicit.');
        }

        if (!lists.monitoringLogging.length) {
            reviewPoints.push('Monitoring and logging tools are not explicit.');
        }

        if (!reviewPoints.length) {
            reviewPoints.push('Review exact service ownership, data contracts, failure paths, access policy, and operational runbooks before implementation.');
        }

        if (score >= 86) {
            return {
                level: 'Low review risk',
                tone: 'low',
                icon: 'bi bi-shield-check',
                summary: 'The generated logical model includes actors, channels, services, data, integrations, identity, notifications, and observability signals.',
                reviewPoints
            };
        }

        if (score >= 70) {
            return {
                level: 'Moderate review risk',
                tone: 'moderate',
                icon: 'bi bi-exclamation-triangle',
                summary: 'The generated model is useful for review, but several application design details still need confirmation.',
                reviewPoints
            };
        }

        return {
            level: 'High review risk',
            tone: 'high',
            icon: 'bi bi-exclamation-octagon',
            summary: 'The generated model is too thin for serious planning without additional application detail.',
            reviewPoints
        };
    }

    function buildPros(model) {
        const lists = model.lists;
        const pros = [
            'Actors, frontend channels, service layer, data stores, integrations, identity, notifications, and observability are represented in one model.',
            'JSON state preserves prompt, preset, custom fields, generated notes, and layout overrides.'
        ];

        if (lists.backendServices.length >= 4) {
            pros.push('Service decomposition is visible enough for dependency and ownership review.');
        }

        if (lists.authenticationMethod.length) {
            pros.push('Authentication and access method is explicitly represented as a boundary.');
        }

        if (lists.monitoringLogging.length) {
            pros.push('Monitoring and logging signals are included in the operations layer.');
        }

        return pros;
    }

    function buildModelList(model) {
        const controls = model.controls;
        const lists = model.lists;

        return [
            'Preset: ' + model.presetLabel,
            'Application: ' + controls.applicationName,
            'Detail level: ' + detailLevelLabel(controls.detailLevel),
            'Flow focus: ' + flowDepthLabel(controls.flowDepth),
            'Actors: ' + lists.usersActors.length,
            'Services: ' + lists.backendServices.length,
            'Data stores: ' + (lists.databases.length + lists.cacheStorage.length),
            'Integrations: ' + lists.externalIntegrations.length
        ];
    }

    function buildStageMeta(model) {
        const lists = model.lists;

        return [
            {
                icon: 'bi bi-people',
                label: lists.usersActors.length + ' actors',
                tone: 'compute'
            },
            {
                icon: 'bi bi-window-stack',
                label: lists.frontendComponents.length + ' frontend',
                tone: 'network'
            },
            {
                icon: 'bi bi-boxes',
                label: lists.backendServices.length + ' services',
                tone: 'data'
            },
            {
                icon: 'bi bi-diagram-3',
                label: flowDepthLabel(model.controls.flowDepth),
                tone: 'facility'
            }
        ];
    }

    function buildModel(input) {
        const preset = getPreset(input && input.presetId);
        const prompt = String((input && input.prompt) || preset.prompt || '').trim();
        const mergeResult = mergeControlsWithPrompt(prompt, preset, input && input.controls);
        const model = {
            title: 'Logical Application Architecture',
            prompt,
            presetId: preset.id,
            presetLabel: preset.label,
            presetDescription: preset.description,
            controls: mergeResult.controls,
            assumptions: mergeResult.assumptions,
            matchedKeywords: mergeResult.matchedKeywords
        };

        model.lists = buildLists(model.controls);
        const pillars = buildPillars(model);
        const score = Math.round(pillars.reduce(function (sum, pillar) {
            return sum + pillar.score;
        }, 0) / pillars.length);

        model.inventory = buildInventory(model);
        model.routeRows = buildRouteRows(model);
        model.controlRows = buildControlRows(model);
        model.pillars = pillars;
        model.score = score;
        model.risk = buildRisk(model, score);
        model.pros = buildPros(model);
        model.cons = model.risk.reviewPoints;
        model.modelList = buildModelList(model);
        model.stageMeta = buildStageMeta(model);
        model.promptSummary = 'Generated ' + model.presetLabel + ' for ' + model.controls.applicationName + ' with ' + model.lists.backendServices.length + ' service node' + (model.lists.backendServices.length === 1 ? '' : 's') + ', ' + model.lists.databases.length + ' database node' + (model.lists.databases.length === 1 ? '' : 's') + ', and ' + flowDepthLabel(model.controls.flowDepth).toLowerCase() + ' flow focus.';

        return model;
    }

    function sanitizeLayoutOverrides(value) {
        const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        const result = {};

        Object.keys(source).forEach(function (key) {
            const item = source[key];

            if (!item || typeof item !== 'object') {
                return;
            }

            const override = {};
            ['x', 'y', 'width', 'height'].forEach(function (field) {
                const number = Number(item[field]);

                if (Number.isFinite(number)) {
                    override[field] = number;
                }
            });

            if (Object.keys(override).length) {
                result[key] = override;
            }
        });

        return result;
    }

    function sanitizeSelectedIds(value) {
        if (!Array.isArray(value)) {
            return [];
        }

        return value.map(function (item) {
            return String(item || '').trim();
        }).filter(Boolean);
    }

    function buildExportPayload(input) {
        const model = buildModel({
            prompt: input.prompt,
            presetId: input.presetId,
            controls: input.controls
        });

        return {
            tool: toolId,
            version: toolVersion,
            generated_at: new Date().toISOString(),
            diagram: {
                title: model.title,
                prompt: model.prompt,
                preset_id: model.presetId,
                preset_label: model.presetLabel,
                controls: clone(model.controls)
            },
            layout_overrides: sanitizeLayoutOverrides(input.layoutOverrides),
            selected_ids: sanitizeSelectedIds(input.selectedIds),
            zoom: Number.isFinite(Number(input.zoom)) ? Number(input.zoom) : 1,
            inventory: clone(model.inventory),
            routing_summary: clone(model.routeRows),
            control_summary: clone(model.controlRows),
            prompt_notes: {
                summary: model.promptSummary,
                assumptions: clone(model.assumptions),
                matched_keywords: clone(model.matchedKeywords),
                model: clone(model.modelList),
                pros: clone(model.pros),
                review_points: clone(model.cons)
            },
            pillar_breakdown: clone(model.pillars),
            risk_level: clone(model.risk)
        };
    }

    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object') {
            throw new Error('Import file does not contain a valid architecture state.');
        }

        if (payload.tool !== toolId) {
            throw new Error('This JSON belongs to a different InfraStack tool.');
        }

        const majorVersion = String(payload.version || '').split('.')[0];

        if (majorVersion !== '1') {
            throw new Error('Unsupported Logical Application Architecture state version.');
        }

        const diagram = payload.diagram && typeof payload.diagram === 'object' ? payload.diagram : {};
        const preset = getPreset(diagram.preset_id);
        const controls = normalizeControls(diagram.controls || {}, preset.defaults);

        return {
            prompt: normalizeFreeText(diagram.prompt, preset.prompt),
            presetId: preset.id,
            controls,
            layoutOverrides: sanitizeLayoutOverrides(payload.layout_overrides),
            selectedIds: sanitizeSelectedIds(payload.selected_ids),
            zoom: Number.isFinite(Number(payload.zoom)) ? Number(payload.zoom) : 1
        };
    }

    /**
     * Gets a preset by ID and falls back to the default logical application preset.
     *
     * @param {string} presetId Preset identifier.
     * @returns {object} Preset definition.
     */
    function publicGetPreset(presetId) {
        return clone(getPreset(presetId));
    }

    /**
     * Builds a normalized logical application architecture model.
     *
     * @param {object} input Prompt, preset ID, and control values.
     * @returns {object} Normalized model with inventory, notes, advisory score, and risk summary.
     */
    function publicBuildModel(input) {
        return clone(buildModel(input || {}));
    }

    /**
     * Builds the restorable export payload for the current workspace state.
     *
     * @param {object} input Current prompt, controls, layout overrides, selected IDs, and zoom value.
     * @returns {object} Restorable JSON payload.
     */
    function publicBuildExportPayload(input) {
        return buildExportPayload(input || {});
    }

    /**
     * Validates and normalizes an imported Logical Application Architecture payload.
     *
     * @param {object} payload Parsed JSON import payload.
     * @returns {object} Normalized state ready for browser restore.
     */
    function publicBuildImportedPayloadState(payload) {
        return buildImportedPayloadState(payload);
    }

    return {
        toolId,
        toolVersion,
        presetCatalog: clone(presetCatalog),
        allowedDetailLevels: clone(allowedDetailLevels),
        allowedFlowDepths: clone(allowedFlowDepths),
        listControlKeys: clone(listControlKeys),
        getPreset: publicGetPreset,
        detailLevelLabel,
        flowDepthLabel,
        splitList,
        inferFromPrompt,
        buildModel: publicBuildModel,
        buildExportPayload: publicBuildExportPayload,
        buildImportedPayloadState: publicBuildImportedPayloadState
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchitectureLogicalApplicationModelCore;
}
