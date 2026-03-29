"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.on('uncaughtException', (err, origin) => {
    console.error('CRITICAL: UNCAUGHT EXCEPTION');
    console.error(err);
    console.error('Origin:', origin);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: UNHANDLED REJECTION');
    console.error(reason);
    process.exit(1);
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const admin = __importStar(require("firebase-admin"));
const serviceAccount = require('./firebase-service-account.json');
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Successfully connected to Firebase!");
}
catch (error) {
    console.error("Firebase initialization error:", error);
    process.exit(1);
}
const db = admin.firestore();
const allowedOrigins = [
    'https://5173-firebase-sam-solutionsgit-1774216538931.cluster-y3k7ko3fang56qzieg3trwgyfg.cloudworkstations.dev',
    'http://localhost:5173'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (origin && allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else if (!origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:;");
    next();
});
// Handler for the root URL
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running and ready to accept form submissions.',
        status: 'OK'
    });
});
const allowedFields = [
    'name', 'email', 'company', 'phone', 'service', 'budget',
    'message', 'timeline', 'source', 'comment', 'website'
];
app.post('/api/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submission = {};
        for (const field of allowedFields) {
            if (req.body[field]) {
                submission[field] = req.body[field];
            }
        }
        if (!submission.name || !submission.email || (!submission.message && !submission.comment)) {
            return res.status(400).json({ message: 'Name, email, and a message/comment are required.' });
        }
        const collection = db.collection('form-submissions');
        const result = yield collection.add(submission);
        res.status(201).json({ message: 'Form submitted successfully!', id: result.id });
    }
    catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ message: 'An internal error occurred while submitting the form.' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
