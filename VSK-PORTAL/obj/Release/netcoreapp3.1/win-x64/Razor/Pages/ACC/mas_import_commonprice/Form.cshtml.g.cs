#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_import_commonprice\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "781ccb3d0b61ba124a092b0eff509baf69181697"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_import_commonprice.Pages_ACC_mas_import_commonprice_Form), @"mvc.1.0.view", @"/Pages/ACC/mas_import_commonprice/Form.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_import_commonprice
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"781ccb3d0b61ba124a092b0eff509baf69181697", @"/Pages/ACC/mas_import_commonprice/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_import_commonprice_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "1", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "781ccb3d0b61ba124a092b0eff509baf691816974953", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:690px"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">");
#nullable restore
#line 7 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_import_commonprice\Form.cshtml"
                                       Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" Form</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">

                    <div class=""kt-portlet__body"">

");
                WriteLiteral(@"
                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-sm-3 col-form-label"">รหัสสินค้า :</label>
                            <div class=""col-sm-9"">
                                <input class=""form-control"" id=""item_code"" name=""item_code"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 1904, "\"", 1912, 0);
                EndWriteAttribute();
                WriteLiteral(@" required>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-sm-3 col-form-label"">ชื่อสินค้า :</label>
                            <div class=""col-sm-9"">
                                <input class=""form-control"" id=""item_name"" name=""item_name"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 2306, "\"", 2314, 0);
                EndWriteAttribute();
                WriteLiteral(@" required readonly>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-md-3 col-form-label"">ผู้ขาย :</label>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""Sale_user"" name=""Sale_user""");
                BeginWriteAttribute("value", " value=\"", 2713, "\"", 2721, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>

                        <div class=""form-group form-group-sm  row"">
                            <label class=""col-md-3 col-form-label"">ผู้ขอซื้อ :</label>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""Buyer_Po_User"" name=""Buyer_Po_User""");
                BeginWriteAttribute("value", " value=\"", 3115, "\"", 3123, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>
                        <div class=""form-group form-group-sm row "">
                            <label class=""col-sm-3 col-form-label"">วันใบรับสินค้า :</label>
                            <div class=""col-sm-9"">
                                <input class=""form-control"" id=""GR_date"" name=""GR_date"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 3508, "\"", 3516, 0);
                EndWriteAttribute();
                WriteLiteral(" ");
                WriteLiteral(@">
                            </div>
                        </div>
                        <div class=""form-group form-group-sm row "">
                            <label class=""col-sm-3 col-form-label"">รหัสใบรับสินค้า :</label>
                            <div class=""col-sm-9"">
                                <input class=""form-control"" id=""GR_no"" name=""GR_no"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 3911, "\"", 3919, 0);
                EndWriteAttribute();
                WriteLiteral(@" required>
                            </div>
                        </div>

                        <div class=""form-group form-group-sm row kt-align-left "">
                            <label class=""col-sm-10 col-form-label"">&nbsp;</label>
                        </div>

                        <div class=""form-group form-group-sm row"" style=""margin-top:-15px;"">
                            <label class=""col-sm-3 col-form-label"">Receive Date(est.) :</label>
                            <div class=""col-sm-9"">
                                <input class=""form-control"" id=""est_date"" name=""est_date"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 4547, "\"", 4555, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                            </div>
                        </div>

                        <div class=""form-group form-group-sm row"">
                            <label class=""col-sm-3 col-form-label"">สถานะ : </label>
                            <div class=""col-sm-9"">
                                <select id=""pr_receive_type"" name=""pr_receive_type"" class=""form-control"">
                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "781ccb3d0b61ba124a092b0eff509baf6918169710746", async() => {
                    WriteLiteral("-- เลือกสถานะ --");
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
                WriteLiteral("\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "781ccb3d0b61ba124a092b0eff509baf6918169712016", async() => {
                    WriteLiteral("Pendding PO");
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
                WriteLiteral("\r\n");
                WriteLiteral(@"                                </select>
                            </div>
                        </div>
                        <div class=""form-group form-group-sm row"">
                            <label class=""col-sm-3 col-form-label"">เพิ่มเติม : </label>
                            <div class=""col-sm-9"">
                                <textarea class=""form-control"" id=""pr_receive_comment"" name=""pr_receive_comment"" type=""text""");
                BeginWriteAttribute("value", " value=\"", 5694, "\"", 5702, 0);
                EndWriteAttribute();
                WriteLiteral(@" rows=""3""></textarea>
                            </div>
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
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
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
