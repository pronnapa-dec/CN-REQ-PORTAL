#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_pricelist\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8b0d641b92889ac5d2a68d20bc4fdcd004018937"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_pricelist.Pages_ACC_mas_pricelist_Form), @"mvc.1.0.view", @"/Pages/ACC/mas_pricelist/Form.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_pricelist
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8b0d641b92889ac5d2a68d20bc4fdcd004018937", @"/Pages/ACC/mas_pricelist/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_pricelist_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "0", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "backlog", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "stock", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd0040189375482", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:990px"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_pricelist\Form.cshtml"
                                       Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" Form</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">

                    <div class=""form-group row"">
                        <label for=""source_site_code"" class=""col-sm-2 col-form-label"">Source Site <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <select class=""form-control select2"" id=""source_site_code"" name=""source_site_code"" data-width=""100%"" required>
                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd0040189377053", async() => {
                    WriteLiteral("--- Select Source Site ---");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                            </select>
                        </div>

                        <label for=""destination_code"" class=""col-sm-2 col-form-label"">Destination Site <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <select class=""form-control select2"" id=""destination_site_code"" name=""destination_site_code"" data-width=""100%"" required>
                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd0040189378759", async() => {
                    WriteLiteral("--- Select Destination Site ---");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                            </select>
                        </div>
                    </div>

                    <div class=""form-group row item_select2"">
                        <label for=""item_barcode"" class=""col-sm-2 col-form-label"">Item Name <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-10"">
                            <select class=""form-control select2"" id=""item_barcode"" name=""item_barcode"" data-width=""100%"" required disabled>
                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd00401893710544", async() => {
                    WriteLiteral("--- Select Barcode Item ---");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                            </select>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n");
                WriteLiteral(@"
                    <div class=""form-group row"">
                        <label for=""item_formula"" class=""col-sm-2 col-form-label"">Formula <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <select class=""form-control select2"" id=""item_formula"" name=""item_formula"" data-width=""100%"" required>
                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd00401893712352", async() => {
                    WriteLiteral("--- Select Formula ---");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                            </select>
                        </div>
                        <label for=""PackCodeRounding"" class=""col-sm-2 col-form-label"">Pack Code Rounding  <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""PackCodeRounding"" name=""PackCodeRounding""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3906, "\"", 3920, 0);
                EndWriteAttribute();
                WriteLiteral(@" value=""1"" readonly />
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""Onhand"" class=""col-sm-2 col-form-label"">Stock On Hand <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""number"" class=""form-control"" id=""Onhand"" name=""Onhand""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4332, "\"", 4346, 0);
                EndWriteAttribute();
                WriteLiteral(@" value=""0"" readonly />
                        </div>
                        <label for=""item_pending_po"" class=""col-sm-2 col-form-label"">Pending PO  <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""item_pending_po"" name=""item_pending_po""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4701, "\"", 4715, 0);
                EndWriteAttribute();
                WriteLiteral(@" value=""0"" readonly />
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""lead_time"" class=""col-sm-2 col-form-label"">Lead Time(Day)  <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""number"" class=""form-control"" id=""lead_time"" name=""lead_time""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5138, "\"", 5152, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 5153, "\"", 5161, 0);
                EndWriteAttribute();
                WriteLiteral(@" min=""0"" step=""1"" required />
                        </div>
                        <label for=""ManualSafetyStockQty"" class=""col-sm-2 col-form-label"">Safety Stock </label>
                        <div class=""col-sm-4"">
                            <input type=""number"" class=""form-control"" id=""ManualSafetyStockQty"" name=""ManualSafetyStockQty""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5509, "\"", 5523, 0);
                EndWriteAttribute();
                WriteLiteral(@" value=""0"" readonly>
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""StockStatus"" class=""col-sm-2 col-form-label"">Stock Status  <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""StockStatus"" name=""StockStatus""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5946, "\"", 5960, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 5961, "\"", 5969, 0);
                EndWriteAttribute();
                WriteLiteral(@" readonly>
                        </div>

                        <label for=""item_status_site_setting"" class=""col-sm-2 col-form-label"">Stock Status Site Setting</label>
                        <div class=""col-sm-4"">
                            <select class=""form-control select2"" id=""item_status_site_setting"" name=""item_status_site_setting"" data-width=""100%"" required disabled>
                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd00401893717713", async() => {
                    WriteLiteral("--- Select Status Site Setting ---");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd00401893718997", async() => {
                    WriteLiteral("BACKLOG");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8b0d641b92889ac5d2a68d20bc4fdcd00401893720254", async() => {
                    WriteLiteral("STOCK");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_3.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                            </select>
                        </div>

                    </div>

                    <div class=""form-group row"">
                        <label for=""MinQty"" class=""col-sm-2 col-form-label"">Min <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""number"" class=""form-control"" id=""MinQty"" name=""MinQty"" placeholder=""0""");
                BeginWriteAttribute("value", " value=\"", 7031, "\"", 7039, 0);
                EndWriteAttribute();
                WriteLiteral(@" min=""0"" step=""1"" readonly>
                        </div>
                        <label for=""MaxQty"" class=""col-sm-2 col-form-label"">Max <span class=""tx-danger"">*</span></label>
                        <div class=""col-sm-4"">
                            <input type=""number"" class=""form-control"" id=""MaxQty"" name=""MaxQty"" placeholder=""0""");
                BeginWriteAttribute("value", " value=\"", 7382, "\"", 7390, 0);
                EndWriteAttribute();
                WriteLiteral(@" min=""0"" step=""1"" readonly>
                        </div>
                    </div>

                    <div class=""form-group row d-none"">
                        <label for=""item_reorder_point"" class=""col-sm-2 col-form-label"">Reorder Point </label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""item_reorder_point"" name=""item_reorder_point""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7816, "\"", 7830, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 7831, "\"", 7839, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                        </div>
                        <label for=""item_reorder_qty"" class=""col-sm-2 col-form-label"">Reorder QTY.</label>
                        <div class=""col-sm-4"">
                            <input type=""number"" class=""form-control"" id=""item_reorder_qty"" name=""item_reorder_qty""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8146, "\"", 8160, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 8161, "\"", 8169, 0);
                EndWriteAttribute();
                WriteLiteral(@" min=""0"" step=""1"">
                        </div>
                    </div>

                    <div class=""form-group row"">
                        <label for=""item_result_final"" class=""col-sm-2 col-form-label"">Result Final </label>
                        <div class=""col-sm-4"">
                            <input type=""text"" class=""form-control"" id=""item_result_final"" name=""item_result_final""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8575, "\"", 8589, 0);
                EndWriteAttribute();
                WriteLiteral(@" value=""0"" readonly>
                        </div>
                    </div>

                    <div class=""row"">
                        <div class=""col-sm-6"">
                            <div class=""form-group row"">
                                <label for=""item_spare_1"" class=""col-sm-4 col-form-label"">Spare 1</label>
                                <div class=""col-sm-8"">
                                    <input type=""text"" class=""form-control"" id=""item_spare_1"" name=""item_spare_1""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9095, "\"", 9109, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 9110, "\"", 9118, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                                </div>
                                <label for=""item_spare_2"" class=""col-sm-4 col-form-label mg-t-15"">Spare 2</label>
                                <div class=""col-sm-8 mg-t-15"">
                                    <input type=""text"" class=""form-control"" id=""item_spare_2"" name=""item_spare_2""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9456, "\"", 9470, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 9471, "\"", 9479, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                                </div>
                                <label for=""item_spare_3"" class=""col-sm-4 col-form-label mg-t-15"">Spare 3</label>
                                <div class=""col-sm-8 mg-t-15"">
                                    <input type=""text"" class=""form-control"" id=""item_spare_3"" name=""item_spare_3""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9817, "\"", 9831, 0);
                EndWriteAttribute();
                BeginWriteAttribute("value", " value=\"", 9832, "\"", 9840, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                                </div>
                            </div>
                            <fieldset class=""form-group"">
                                <div class=""row"">

                                    <label class=""col-form-label col-sm-4 pt-0"">Active Status</label>
                                    <div class=""col-sm-8"">
                                        <div class=""form-check form-check-inline"">
                                            <input class=""form-check-input record_status"" type=""radio"" name=""recode_status"" id=""recode_status_yes"" value=""Y"" checked>
                                            <label class=""form-check-label tx-success"" for=""recode_status_yes"">
                                                Enabled
                                            </label>
                                        </div>
                                        <div class=""form-check form-check-inline"">
                                            <input class=""for");
                WriteLiteral(@"m-check-input record_status"" type=""radio"" name=""recode_status"" id=""recode_status_no"" value=""N"">
                                            <label class=""form-check-label tx-danger"" for=""recode_status_no"">
                                                Disabled
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class=""col-sm-6"">
                            <fieldset class=""form-group"">
                                <div class=""row"">

                                    <label for=""item_backlog_ctrl"" class=""col-form-label col-sm-4 pt-0"">Backlog Control</label>
                                    <div class=""col-sm-8"">
                                        <div class=""form-check form-check-inline"">
                                            <input class=""form-che");
                WriteLiteral(@"ck-input item_backlog_ctrl"" type=""radio"" name=""item_backlog_ctrl"" id=""item_backlog_ctrl_yes"" value=""Y"" disabled>
                                            <label class=""form-check-label tx-success"" for=""item_backlog_ctrl_yes"">
                                                Yes
                                            </label>
                                        </div>
                                        <div class=""form-check form-check-inline"">
                                            <input class=""form-check-input item_backlog_ctrl"" type=""radio"" name=""item_backlog_ctrl"" id=""item_backlog_ctrl_no"" value=""N"" disabled>
                                            <label class=""form-check-label tx-danger"" for=""item_backlog_ctrl_no"">
                                                No
                                            </label>
                                        </div>
                                    </div>

                                </div>
                    ");
                WriteLiteral(@"        </fieldset>

                            <div class=""row form-group"">
                                <label for=""remark"" class=""col-sm-4 col-form-label"">Remark</label>
                                <div class=""col-sm-8"">
                                    <textarea class=""form-control"" id=""site_remark"" name=""site_remark"" rows=""5""></textarea>
                                </div>
");
                WriteLiteral(@"                            </div>
                        </div>

                    </div>

                    <div class=""modal-footer"">
                        <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"">Save</button>
                        <button id=""btn-save_new"" class=""btn ripple btn-success btn-save_form"" data-action=""save_new"" type=""submit"">Save & New</button>
                        <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!--End Scroll with content modal -->
");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
