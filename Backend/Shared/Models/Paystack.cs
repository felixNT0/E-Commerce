using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EComm.Shared.Models
{
    public class Paystack { }

    public class TransactionInitializationResponse
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public Data Data { get; set; }
    }

    public class Data
    {
        [JsonPropertyName("authorization_url")]
        public string AuthorizationUrl { get; set; }
        public string AccessCode { get; set; }
        public string Reference { get; set; }
    }

    public class PaystackWebhookEvent
    {
        public string Event { get; set; }
        public PaymentData Data { get; set; }
    }

    public class PaymentData
    {
        public long Id { get; set; }
        public string Domain { get; set; }
        public string Status { get; set; }
        public string Reference { get; set; }
        public int Amount { get; set; }
        public string Message { get; set; }

        [JsonPropertyName("gateway_response")]
        public string GatewayResponse { get; set; }

        [JsonPropertyName("paid_at")]
        public DateTime PaidAt { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }
        public string Channel { get; set; }
        public string Currency { get; set; }

        [JsonPropertyName("ip_address")]
        public string IpAddress { get; set; }
        public object Metadata { get; set; } // Can be string, JSON, or other types
        public PaymentLog Log { get; set; }
        public object Fees { get; set; } // Fees might be nullable
        public CustomerInfo Customer { get; set; }
        public AuthorizationInfo Authorization { get; set; }
        public object Plan { get; set; } // Assuming Plan details could be complex
    }

    public class PaymentLog
    {
        public int TimeSpent { get; set; }
        public int Attempts { get; set; }
        public string Authentication { get; set; }
        public int Errors { get; set; }
        public bool Success { get; set; }
        public bool Mobile { get; set; }
        public List<object> Input { get; set; } // Can be an empty list
        public string Channel { get; set; }
        public List<LogHistory> History { get; set; }
    }

    public class LogHistory
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public int Time { get; set; }
    }

    public class CustomerInfo
    {
        public int Id { get; set; }

        [JsonPropertyName("first_name")]
        public string FirstName { get; set; }

        [JsonPropertyName("last_name")]
        public string LastName { get; set; }
        public string Email { get; set; }

        [JsonPropertyName("customer_code")]
        public string CustomerCode { get; set; }
        public string Phone { get; set; }
        public object Metadata { get; set; }

        [JsonPropertyName("risk_action")]
        public string RiskAction { get; set; }
    }

    public class AuthorizationInfo
    {
        [JsonPropertyName("authorization_code")]
        public string AuthorizationCode { get; set; }
        public string Bin { get; set; }
        public string Last4 { get; set; }

        [JsonPropertyName("exp_month")]
        public string ExpMonth { get; set; }

        [JsonPropertyName("exp_year")]
        public string ExpYear { get; set; }

        [JsonPropertyName("card_type")]
        public string CardType { get; set; }
        public string Bank { get; set; }

        [JsonPropertyName("country_code")]
        public string CountryCode { get; set; }
        public string Brand { get; set; }

        [JsonPropertyName("account_name")]
        public string AccountName { get; set; }
    }
}
