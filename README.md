Sample application using react, redux and youtube api

react-redux-youtube-api
# react-redux-youtube-api

DECLARE
   json_data CLOB := '<your_json_data>';

   xml_data CLOB := EMPTY_CLOB();

BEGIN
   SELECT XMLELEMENT("OrderTransactions",
                  XMLELEMENT("Order",
                     XMLELEMENT("TransactionDateTime", b.TransactionDateTime),
                     XMLELEMENT("OrgCode", b.OrgCode),
                     XMLELEMENT("SourceTransactionID", b.SourceTransactionID),
                     XMLELEMENT("SourceUser", b.SourceUser),
                     XMLELEMENT("SourceReferenceNumber", b.SourceReferenceNumber),
                     XMLELEMENT("OracleOrderType", b.OracleOrderType),
                     XMLELEMENT("QuoteName", b.QuoteName),
                     XMLELEMENT("CustomerAccountNumber", b.CustomerAccountNumber),
                     XMLELEMENT("PrimarySalesPersonAssociateID", b.PrimarySalesPersonAssociateID),
                     XMLELEMENT("BookPriceName", b.BookPriceName),
                     XMLELEMENT("AutoSubmitFlag", b.AutoSubmitFlag),
                     XMLAGG(
                        XMLELEMENT("AddressContact",
                           XMLELEMENT("AddressUse", ac.AddressUse),
                           XMLELEMENT("AddressLine1", ac.AddressLine1),
                           XMLELEMENT("AddressLine2", ac.AddressLine2),
                           XMLELEMENT("City", ac.City),
                           XMLELEMENT("State", ac.State),
                           XMLELEMENT("County", ac.County),
                           XMLELEMENT("Zip", ac.Zip),
                           XMLELEMENT("Country", ac.Country),
                           XMLELEMENT("ContactLastName", ac.ContactLastName),
                           XMLELEMENT("ContactFirstName", ac.ContactFirstName),
                           XMLELEMENT("ContactPhone", ac.ContactPhone),
                           XMLELEMENT("ContactEmail", ac.ContactEmail)
                        )
                     ),
                     XMLELEMENT("OrderComment", b.OrderComment),
                     XMLTYPE(
                        '<EntityList>' ||
                        LISTAGG(
                           '<Entity>' ||
                           '<RevenueRegion>' || en.RevenueRegion || '</RevenueRegion>' ||
                           '<ProductCode>' || en.ProductCode || '</ProductCode>' ||
                           '<CompanyCode>' || en.CompanyCode || '</CompanyCode>' ||
                           '<OrderEntityType>' || en.OrderEntityType || '</OrderEntityType>' ||
                           '<InputMethod>' || en.InputMethod || '</InputMethod>' ||
                           '<RevenueSortCode>' || en.RevenueSortCode || '</RevenueSortCode>' ||
                           '<PriceType>' || en.PriceType || '</PriceType>' ||
                           '<PEName>' || en.PEName || '</PEName>' ||
                           '<ParentCompanyCode>' || en.ParentCompanyCode || '</ParentCompanyCode>' ||
                           '<PaymentMethod>' || en.PaymentMethod || '</PaymentMethod>' ||
                           '<BankAccountId>' || en.BankAccountId || '</BankAccountId>' ||
                           '<PaymentTerms>' || en.PaymentTerms || '</PaymentTerms>' ||
                           '<GroupInvoicingFlag>' || en.GroupInvoicingFlag || '</GroupInvoicingFlag>' ||
                           '<InvoiceFrequency>' || en.InvoiceFrequency || '</InvoiceFrequency>' ||
                           '<InvoiceDeliveryMethod>' || en.InvoiceDeliveryMethod || '</InvoiceDeliveryMethod>' ||
                           '<InvoiceDeliveryEmailAddress>' || en.InvoiceDeliveryEmailAddress || '</InvoiceDeliveryEmailAddress>' ||
                           LISTAGG(
                              '<Feature>' ||
                              '<ItemNumber>' || ft.ItemNumber || '</ItemNumber>' ||
                              '<ItemQty>' || ft.ItemQty || '</ItemQty>' ||
                              '<FeatureGroup>' || ft.FeatureGroup || '</FeatureGroup>' ||
                              '<FeatureCode>' || ft.FeatureCode || '</FeatureCode>' ||
                              '</Feature>',
                              '<FeatureList>'
                           ) WITHIN GROUP (ORDER BY ft.FeatureCode) ||
                           '</FeatureList>',
                           '<Entity>'
                        ) WITHIN GROUP (ORDER BY en.RevenueRegion, en.ProductCode) ||
                        '</EntityList>'
                     )
                  )
               )
   INTO xml_data
   FROM (
      -- Your main query here
   ) b
   LEFT JOIN (
      -- Your join with AddressContact table here
   ) ac ON ac.OrderNumber = b.OrderNumber
   LEFT JOIN (
      -- Your join with Entity and Feature tables here
   ) en ON en.OrderNumber = b.OrderNumber
   LEFT JOIN (
      -- Your join with Feature table here
   ) ft ON ft.OrderNumber = b.OrderNumber AND ft.LineNumber = en.LineNumber
   GROUP BY b.OrderNumber;

   -- Use the XML data as needed
   -- ...

END;

