#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-TRP\opt-packing-list\Modal_Box.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "af9356cc92b65a30322ce7537133648b465d114f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_TRP.opt_packing_list.Pages_VSK_TRP_opt_packing_list_Modal_Box), @"mvc.1.0.view", @"/Pages/VSK-TRP/opt-packing-list/Modal_Box.cshtml")]
namespace MIS_PORTAL.Pages.VSK_TRP.opt_packing_list
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
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"af9356cc92b65a30322ce7537133648b465d114f", @"/Pages/VSK-TRP/opt-packing-list/Modal_Box.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_TRP_opt_packing_list_Modal_Box : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_remark"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_remark"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "af9356cc92b65a30322ce7537133648b465d114f4638", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_remark"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered"" role=""document"" style=""max-width:90%"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">ใช้กล่องร่วม</h6>
                    <span class=""mg-l-15 pd-t-4 tx-15 tx-bold tx-primary"" id=""box_job_no""></span>
                    <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <div class=""col-sm-12"">
                            <div class=""form-group form-group-sm row"">
                                <label for=""document_type"" class=""col-md-1 col-form-label tx-left"">เลขที่ : </label>
                                <");
                WriteLiteral("div class=\"col-md-2\">\r\n                                    <select type=\"text\" class=\"form-control\" id=\"job_no\" name=\"job_no\" required>\r\n                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "af9356cc92b65a30322ce7537133648b465d114f6189", async() => {
                    WriteLiteral("--- เลือกเอกสาร ---");
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
                                <div class=""col-md-1"">
                                    <input type=""text"" class=""form-control"" id=""invcode"" name=""invcode"" placeholder=""รหัสลูกค้า"" disabled required>
                                </div>
                                <div class=""col-md-3"">
                                    <input type=""text"" class=""form-control"" id=""invname"" name=""invname"" placeholder=""ชื่อลูกค้า"" disabled required>
                                </div>
                                <div class=""col-md-5"">
                                    <input type=""text"" class=""form-control"" id=""invaddress"" name=""invaddress"" placeholder=""ที่อยู่จัดส่ง"" disabled required>
                                </div>
                            </div>

                            <div class=""form-group form-group-sm row"">

                                <label for=""pck_qty"" class=""col-md-1 col-form-l");
                WriteLiteral("abel\">จำนวน/กล่อง :</label>\r\n                                <div class=\"col-md-1\">\r\n                                    <input type=\"number\" class=\"form-control tx-center\" id=\"pck_qty\" name=\"pck_qty\" min=\"0\" step=\"1\"");
                BeginWriteAttribute("required", " required=\"", 2546, "\"", 2557, 0);
                EndWriteAttribute();
                WriteLiteral(" value=\"0\"  placeholder=\"0\"");
                BeginWriteAttribute("disabled", " disabled=\"", 2585, "\"", 2596, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                </div>

                                <div for=""size_A"" class=""col-1 mg-t-10"">
                                    <label class=""ckbox"">
                                        <input class=""checkbox"" id=""size_A"" name=""checkbox"" type=""checkbox"" value=""a"" disabled>
                                        <span>A</span>
                                    </label>
                                </div>

                                <div for=""size_B"" class=""col-1 mg-t-10"">
                                    <label class=""ckbox"">
                                        <input class=""checkbox"" id=""size_B"" name=""checkbox"" type=""checkbox"" value=""b"" disabled>
                                        <span>B</span>
                                    </label>
                                </div>

                                <div for=""size_C"" class=""col-1 mg-t-10"">
                                    <label class=""ckbox"">
                                  ");
                WriteLiteral(@"      <input class=""checkbox"" id=""size_C"" name=""checkbox"" type=""checkbox"" value=""c"" disabled>
                                        <span>C</span>
                                    </label>
                                </div>

                                <div for=""size_D"" class=""col-1 mg-t-10"">
                                    <label class=""ckbox"">
                                        <input class=""checkbox"" id=""size_D"" name=""checkbox"" type=""checkbox"" value=""d"" disabled>
                                        <span>D</span>
                                    </label>
                                </div>

                                <div for=""size_E"" class=""col-1 mg-t-10"">
                                    <label class=""ckbox"">
                                        <input class=""checkbox"" id=""size_E"" name=""checkbox"" type=""checkbox"" value=""e"" disabled>
                                        <span>E</span>
                                    </label>
               ");
                WriteLiteral(@"                 </div>

                                <div for=""size_F"" class=""col-1 mg-t-10"">
                                    <label class=""ckbox"">
                                        <input class=""checkbox"" id=""size_F"" name=""checkbox"" type=""checkbox"" value=""f"" disabled>
                                        <span>F</span>
                                    </label>
                                </div>

                                <div for=""size_Z"" class=""col-1 mg-t-10"">
                                    <label class=""ckbox"">
                                        <input class=""checkbox"" id=""size_Z"" name=""checkbox"" type=""checkbox"" value=""z"" disabled>
                                        <span>OTHER</span>
                                    </label>
                                </div>

                            </div>

                            <div class=""form-group form-group-sm row"">
                                <label for=""document_remark"" class=""col");
                WriteLiteral(@"-md-1 col-form-label tx-left"">หมายเหตุ : </label>
                                <div class=""col-md-11"">
                                    <textarea class=""form-control"" id=""remark"" placeholder=""รายละเอียด"" rows=""3""></textarea>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div class=""modal-footer"">
                    <button id=""btn-save"" class=""btn ripple btn-success d-none"" type=""button"">บันทึก</button>
                    <button id=""btn-delete"" class=""btn ripple btn-danger d-none"" type=""button"">ลบ</button>
                    <button class=""btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">ปิด</button>
                </div>

            </div>
        </div>
    </div>
");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
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