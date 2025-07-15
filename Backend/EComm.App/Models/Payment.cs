using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Shared.Enums;

namespace EComm.App.Models
{
    public class Payment
    {
        public Guid Id { get; set; }

        public Guid? OrderId { get; set; }

        [Column(TypeName = "decimal(12, 2)")]
        public decimal AmountToPay { get; set; }

        [Column(TypeName = "decimal(12, 2)")]
        public decimal? AmountPaid { get; set; } = 0.00m;

        public Guid TransactionId { get; set; } = Guid.NewGuid();

        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;

        public string PaymentMethod { get; set; } = string.Empty;

        public Order? Order { get; set; }
    }
}
